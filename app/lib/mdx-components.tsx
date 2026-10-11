import type { MDXComponents } from "mdx/types.js";

import { isSitePath, withBase } from "./path";

const components = {
  a({ href, ...props }) {
    return <a href={isSitePath(href) ? withBase(href) : href} {...props} />;
  },
  img({ src, ...props }) {
    return (
      <img src={isSitePath(src) ? withBase(src) : src} {...props} data-pagefind-ignore="all" />
    );
  },
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
