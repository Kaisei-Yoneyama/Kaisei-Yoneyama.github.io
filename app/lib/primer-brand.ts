// SSG ルートは client バンドルに含まれず、コンポーネントごとにスタイルが分けられている ESM 版ではスタイルが適用されない
// そのため、グローバルスタイルシートを提供する UMD 版を使用する

// SSR で外部化される @primer/react-brand (UMD) は名前付きインポートできないため、名前空間インポート・名前付きエクスポートで吸収する
import * as primerBrandNs from "@primer/react-brand";

export type { SubdomainNavBarSearchResultProps } from "@primer/react-brand";

const ns = primerBrandNs as typeof primerBrandNs & { default?: typeof primerBrandNs };
const primerBrand = ns.default ?? ns;

export const {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Hero,
  MinimalFooter,
  Prose,
  Section,
  SectionIntro,
  Stack,
  SubdomainNavBar,
  Text,
  ThemeProvider,
  Tiles,
  Token,
} = primerBrand;
