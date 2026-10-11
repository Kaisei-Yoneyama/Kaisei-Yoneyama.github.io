import { useEffect, useState } from "react";

import { withBase } from "../lib/path";
import { SubdomainNavBar, type SubdomainNavBarSearchResultProps } from "../lib/primer-brand";
import type * as Pagefind from "../pagefind";

const MAX_RESULTS = 10;

let pagefindPromise: Promise<typeof Pagefind | null> | undefined;

function initializePagefind(): Promise<typeof Pagefind | null> {
  pagefindPromise ??= import(/* @vite-ignore */ withBase("/pagefind/pagefind.js"))
    .then((pagefind: typeof Pagefind) => pagefind.init().then(() => pagefind))
    .catch((error) => {
      console.warn("Failed to initialize Pagefind", error);
      return null;
    });

  return pagefindPromise;
}

async function debouncedSearch(term: string): Promise<SubdomainNavBarSearchResultProps[]> {
  if (term.trim() === "") return [];

  const pagefind = await initializePagefind();
  if (!pagefind) return [];

  try {
    const search = await pagefind.debouncedSearch(term, {});
    if (!search) return [];

    return await Promise.all(
      search.results.slice(0, MAX_RESULTS).map(async (result) => {
        const fragment = await result.data();

        return {
          title: fragment.meta.title,
          description: fragment.plain_excerpt.replaceAll("&lt;", "<").replaceAll("&gt;", ">"),
          url: fragment.meta.url,
          date: fragment.meta.published ?? "",
          category: fragment.meta.category,
        };
      }),
    );
  } catch (error) {
    console.warn("Search failed", error);
    return [];
  }
}

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SubdomainNavBarSearchResultProps[]>([]);

  useEffect(() => {
    let ignore = false;

    void debouncedSearch(searchTerm).then((results) => {
      if (!ignore) {
        setSearchResults(results);
      }
    });

    return () => {
      ignore = true;
    };
  }, [searchTerm]);

  return (
    <SubdomainNavBar
      title="Kaisei Yoneyama"
      titleHref={withBase("/")}
      logoHref="https://github.com/Kaisei-Yoneyama"
      fixed={false}
    >
      <SubdomainNavBar.Link href={withBase("/blog/")}>Blog</SubdomainNavBar.Link>
      <SubdomainNavBar.Link href={withBase("/#skills")}>Skills</SubdomainNavBar.Link>
      <SubdomainNavBar.Search
        onSubmit={(event) => event.preventDefault()}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
        keyboardShortcut="/"
        searchResults={searchResults}
        searchTerm={searchTerm}
        ref={() => void initializePagefind()}
      />
      <SubdomainNavBar.PrimaryAction href="https://github.com/Kaisei-Yoneyama">
        GitHub
      </SubdomainNavBar.PrimaryAction>
    </SubdomainNavBar>
  );
}
