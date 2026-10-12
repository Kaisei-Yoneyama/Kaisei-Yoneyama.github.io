import { reactRenderer } from "@hono/react-renderer";
import { Link, Script } from "honox/server";

import Footer from "../islands/footer";
import Header from "../islands/header";
import { isSitePath, withBase } from "../lib/path";
import { ThemeProvider } from "../lib/primer-brand";

const SITE_NAME = "Kaisei Yoneyama";

const SITE_ORIGIN = import.meta.env.VITE_ORIGIN;

if (!SITE_ORIGIN) {
  throw new Error("VITE_ORIGIN is not set");
}

function absoluteUrl(path: string) {
  return new URL(path, SITE_ORIGIN).href;
}

export default reactRenderer(({ children, c, title, description, post }) => {
  const path = c.req.path;

  return (
    <html lang="ja" prefix="og: https://ogp.me/ns# article: https://ogp.me/ns/article#">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ? `${title} | ${SITE_NAME}` : SITE_NAME}</title>
        {description && (
          <meta
            name="description"
            content={description}
            data-pagefind-meta="description[content]"
          />
        )}
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content={post ? "article" : "website"} />
        <meta
          property="og:title"
          content={title ?? SITE_NAME}
          data-pagefind-meta="title[content]"
        />
        {description && <meta property="og:description" content={description} />}
        {isSitePath(path) && (
          <meta
            property="og:url"
            content={absoluteUrl(withBase(path))}
            data-pagefind-meta={`url:${withBase(path)}`}
          />
        )}
        <meta
          property="og:image"
          content={absoluteUrl(post ? post.ogImage : withBase("/og/site.png"))}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={post ? post.title : SITE_NAME} />
        {post && (
          <>
            <meta
              property="article:published_time"
              content={post.published}
              data-pagefind-meta="published[content]"
            />
            {post.modified && <meta property="article:modified_time" content={post.modified} />}
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href={withBase("/favicon.ico")} />
        {/* @ts-expect-error Hono v4.13.0 で React と型が合わなくなったので応急対応 */}
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" async />
      </head>
      <body>
        <ThemeProvider
          colorMode="dark"
          style={{
            backgroundColor: "var(--brand-color-canvas-default)",
            color: "var(--brand-color-text-default)",
          }}
        >
          <Header />
          <main>{children}</main>
          <Footer copyrightStatement={`© ${new Date().getFullYear()} ${SITE_NAME}`} />
        </ThemeProvider>
      </body>
    </html>
  );
});
