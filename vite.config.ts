import ssg from "@hono/vite-ssg";
import mdx from "@mdx-js/rollup";
import rehypeShiki, { type RehypeShikiOptions } from "@shikijs/rehype";
import honox from "honox/vite";
import client from "honox/vite/client";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";

const entry = "./app/server.ts";

function normalizeBase(base = ""): `/${string}` {
  const path = base.split("/").filter(Boolean).join("/");
  return path ? `/${path}/` : "/";
}

export default defineConfig(({ mode }) => {
  // 開発サーバーでは Link/Script がベース URL を付与しないパスを書き出すため / に固定する
  const base = mode === "development" ? "/" : normalizeBase(process.env.BASE_PATH);

  if (mode === "client") {
    return {
      base,
      plugins: [client({ input: ["/app/client.ts", "/app/style.css"], jsxImportSource: "react" })],
    };
  }

  return {
    build: { emptyOutDir: false },
    ssr: {
      external: [
        // CommonJS/UMD は SSR でバンドルすると評価に失敗するため、外部化して Node.js の require に解決させる
        "react",
        "react-dom",
        "@primer/react-brand",
        "@takumi-rs/core",
        "@takumi-rs/helpers",
        "lightningcss",
      ],
    },
    plugins: [
      // base を直接指定すると内部で @hono/vite-dev-server に上書きされるため devServer を経由させる
      honox({ devServer: { base } }),
      ssg({ entry }),
      mdx({
        jsxImportSource: "react",
        providerImportSource: "/app/lib/mdx-components.tsx",
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
        remarkRehypeOptions: {
          footnoteLabelProperties: { className: ["sr-only"], dataPagefindIgnore: "" },
        },
        rehypePlugins: [
          [
            rehypeShiki,
            {
              themes: { light: "github-light-default", dark: "github-dark-default" },
              defaultColor: "light-dark()",
              rootStyle: false,
            } satisfies RehypeShikiOptions,
          ],
        ],
      }),
    ],
  };
});
