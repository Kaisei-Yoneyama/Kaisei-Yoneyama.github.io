import type { Post } from "../lib/posts";
import { Card, Section, Token } from "../lib/primer-brand";

type PostListProps = {
  posts: readonly Post[];
  headingAs: "h2" | "h3";
};

export default function PostList({ posts, headingAs }: PostListProps) {
  return (
    <>
      {posts.map((post) => (
        <Section
          key={post.slug}
          variant="gridline"
          paddingBlockStart="condensed"
          paddingBlockEnd="condensed"
          as="div"
        >
          <Card href={post.href} variant="minimal" fullWidth ctaText="続きを読む">
            <Card.Heading as={headingAs}>{post.title}</Card.Heading>
            <Card.Description>{post.description}</Card.Description>
            <Card.Tokens position="block-end">
              <Token variant="outline">
                公開 <time dateTime={post.published}>{post.published}</time>
              </Token>
              {post.modified && (
                <Token variant="outline">
                  更新 <time dateTime={post.modified}>{post.modified}</time>
                </Token>
              )}
            </Card.Tokens>
          </Card>
        </Section>
      ))}
    </>
  );
}
