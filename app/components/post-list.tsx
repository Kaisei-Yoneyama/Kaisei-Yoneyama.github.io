import type { ComponentProps } from "react";

import type { Post } from "../lib/posts";
import { Card, Grid, Token } from "../lib/primer-brand";

type PostListProps = {
  posts: readonly Post[];
  headingAs: "h2" | "h3";
  columnSpan: NonNullable<ComponentProps<typeof Grid.Column>["span"]>;
};

export default function PostList({ posts, headingAs, columnSpan }: PostListProps) {
  return (
    <Grid enableGutters={false}>
      {posts.map((post) => (
        <Grid.Column key={post.slug} span={columnSpan}>
          <Card ctaText="続きを読む" fullWidth href={post.href}>
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
        </Grid.Column>
      ))}
    </Grid>
  );
}
