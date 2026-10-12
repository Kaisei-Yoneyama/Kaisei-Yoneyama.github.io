import { reactRenderer } from "@hono/react-renderer";
import { renderToStaticMarkup } from "react-dom/server";

import Hero from "../../../islands/hero";
import { withBase } from "../../../lib/path";
import { posts } from "../../../lib/posts";
import { Breadcrumbs, Prose, Section, Stack } from "../../../lib/primer-brand";

const postPathPattern = new URLPattern({ pathname: "/blog/:slug" });

export default reactRenderer(({ children, Layout, c, title, description, frontmatter }) => {
  // /blog 配下のエラーページ (frontmatter なし) もここを通る
  if (!frontmatter) {
    return (
      <Layout title={title} description={description}>
        {children}
      </Layout>
    );
  }

  const slug = postPathPattern.exec({ pathname: c.req.path })?.pathname.groups.slug;
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    throw new Error('Post not found in "posts"');
  }

  const html = renderToStaticMarkup(children);

  return (
    <Layout title={frontmatter.title} description={frontmatter.description} post={post}>
      <>
        <Section
          variant="gridline"
          paddingBlockStart="condensed"
          paddingBlockEnd="condensed"
          as="div"
        >
          <Breadcrumbs>
            <Breadcrumbs.Item href={withBase("/")}>ホーム</Breadcrumbs.Item>
            <Breadcrumbs.Item href={withBase("/blog/")}>ブログ</Breadcrumbs.Item>
            <Breadcrumbs.Item href="" selected>
              {frontmatter.title}
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </Section>

        <Hero
          label="Blog"
          heading={frontmatter.title}
          description={frontmatter.description}
          dates={{ published: frontmatter.published, modified: frontmatter.modified }}
        />

        <Section
          variant="gridline"
          paddingBlockStart="normal"
          paddingBlockEnd="normal"
          as="div"
          data-pagefind-body=""
          data-pagefind-meta="category:Blog"
        >
          {/* Prose の先頭と末尾のマージンが外に相殺されると Section の罫線が端まで引かれないため、flex コンテナーでラップする */}
          <Stack padding="none">
            <Prose html={html} enableFullWidth />
          </Stack>
        </Section>
      </>
    </Layout>
  );
});
