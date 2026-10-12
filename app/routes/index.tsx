import { createRoute } from "honox/factory";
import type { SimpleIcon } from "simple-icons";
import {
  siDocker,
  siGithub,
  siGithubactions,
  siGoogleappsscript,
  siHono,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siRedis,
  siScala,
  siTypescript,
  siWxt,
} from "simple-icons";

import PostList from "../components/post-list";
import Hero from "../islands/hero";
import { withBase } from "../lib/path";
import { posts } from "../lib/posts";
import { Box, Section, SectionIntro, Tiles } from "../lib/primer-brand";

const description =
  "プログラミング教材制作に携わっています。個人開発では、ウェブアプリケーションをはじめ、ブラウザー拡張機能やボットの開発に勤しんでいます。";

const SKILLS: readonly { icon: SimpleIcon; name: string }[] = [
  { icon: siTypescript, name: "TypeScript" },
  { icon: siScala, name: "Scala" },
  { icon: siNodedotjs, name: "Node.js" },
  { icon: siOpenjdk, name: "JVM" },
  { icon: siHono, name: "Hono" },
  { icon: siWxt, name: "WXT" },
  { icon: siGoogleappsscript, name: "Apps Script" },
  { icon: siGithub, name: "GitHub Pages" },
  { icon: siPostgresql, name: "PostgreSQL" },
  { icon: siRedis, name: "Redis" },
  { icon: siDocker, name: "Docker" },
  { icon: siGithubactions, name: "GitHub Actions" },
];

const recentPosts = posts.slice(0, 3);

function Logo({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}

export default createRoute((c) => {
  return c.render(
    <>
      <Hero
        label="Hobbyist programmer"
        heading="Kaisei Yoneyama"
        description={description}
        actions={[
          { href: "https://github.com/Kaisei-Yoneyama", text: "GitHub を見る" },
          { href: "#skills", text: "スキルを見る" },
        ]}
      />

      <Section id="skills" variant="gridline" paddingBlockStart="normal" paddingBlockEnd="normal">
        <SectionIntro align="center">
          <SectionIntro.Label>Skills</SectionIntro.Label>
          <SectionIntro.Heading size="3">使い慣れている技術</SectionIntro.Heading>
          <SectionIntro.Description>なかでも気に入っているものです。</SectionIntro.Description>
        </SectionIntro>

        <Box marginBlockStart={{ narrow: 32, regular: 48 }}>
          <Tiles>
            {SKILLS.map((skill) => (
              <Tiles.Item key={skill.name} name={skill.name}>
                <Logo icon={skill.icon} />
              </Tiles.Item>
            ))}
          </Tiles>
        </Box>
      </Section>

      {recentPosts.length > 0 && (
        <section id="blog">
          <Section
            variant="gridline"
            paddingBlockStart="normal"
            paddingBlockEnd="condensed"
            as="div"
          >
            <SectionIntro align="center">
              <SectionIntro.Label>Blog</SectionIntro.Label>
              <SectionIntro.Heading size="3">最近の記事</SectionIntro.Heading>
              <SectionIntro.Description>
                開発の記録や学んだことを書いています。
              </SectionIntro.Description>
              <SectionIntro.Link href={withBase("/blog/")}>すべての記事を見る</SectionIntro.Link>
            </SectionIntro>
          </Section>

          <PostList posts={recentPosts} headingAs="h3" />
        </section>
      )}
    </>,
    { description },
  );
});
