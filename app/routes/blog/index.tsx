import { createRoute } from "honox/factory";

import PostList from "../../components/post-list";
import Hero from "../../islands/hero";
import { posts } from "../../lib/posts";
import { Section, Text } from "../../lib/primer-brand";

const description = "開発の記録や学んだことを書いています。";

export default createRoute((c) => {
  return c.render(
    <>
      <Hero label="Blog" heading="ブログ" description={description} />

      <Section variant="gridline" paddingBlockStart="normal" paddingBlockEnd="normal" as="div">
        {posts.length === 0 ? (
          <Text as="p" variant="muted">
            まだ記事はありません。
          </Text>
        ) : (
          <PostList posts={posts} headingAs="h2" columnSpan={12} />
        )}
      </Section>
    </>,
    { title: "Blog", description },
  );
});
