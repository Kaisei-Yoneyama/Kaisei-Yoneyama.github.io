/**
 * @file Pagefind/pagefind#767 が対応されたら置き換える。
 * @see {@link https://github.com/pagefind/pagefind/blob/main/pagefind_web_js/types/index.d.ts}
 */

export declare function init(): Promise<void>;

export declare function debouncedSearch(
  term: string,
  options: PagefindSearchOptions,
  debounceTimeoutMs?: number,
): Promise<PagefindIndexesSearchResults | null>;

export type PagefindSearchOptions = {
  preload?: boolean;
  verbose?: boolean;
  filters?: object;
  sort?: object;
};

export type PagefindIndexesSearchResults = {
  results: PagefindSearchResult[];
};

export type PagefindSearchResult = {
  data: () => Promise<PagefindSearchFragment>;
};

export type PagefindSearchFragment = {
  url: string;
  plain_excerpt: string;
  meta: Record<string, string>;
};
