import { readFileSync } from "node:fs";

import { type FontLoader, Renderer } from "@takumi-rs/core";
import { fromJsx } from "@takumi-rs/helpers/jsx";
import { Features, type FontFaceRule, type TokenOrValue, transform } from "lightningcss";
import type { ReactElement } from "react";

import mainCss from "@primer/react-brand/lib/css/main.css?raw";

const ROOT_FONT_SIZE = 16;

/**
 * 長さを px 値に変換する。
 * 対応しているのは px 値と rem 値のみ。それ以外の場合は NaN を返す。
 */
function toPx({ type, value }: TokenOrValue) {
  if (type === "length") {
    switch (value.unit) {
      case "px":
        return value.value;
      case "rem":
        return value.value * ROOT_FONT_SIZE;
    }
  }

  return NaN;
}

/**
 * CSS 値関数の引数であるか否かを判定する。
 * 区切りのカンマや空白を取り除く目的で使用する。
 */
function isArgument({ type, value }: TokenOrValue) {
  return !(type === "token" && (value.type === "comma" || value.type === "white-space"));
}

/**
 * null を取り除いたコピーを返す。
 * visitor が返す値に null が含まれているとデシリアライズに失敗するため（parcel-bundler/lightningcss#1065）。
 */
function withoutNull(tokenOrValues: TokenOrValue[]): TokenOrValue[] {
  return JSON.parse(
    JSON.stringify(tokenOrValues, (_key, value) => (value === null ? undefined : value)),
  );
}

/**
 * Takumi が解釈できるようにトランスパイルする。
 */
export function forTakumi(css: string): string {
  const { code } = transform({
    filename: "primer-brand.css",
    code: new TextEncoder().encode(css),
    // 論理的プロパティを物理的プロパティに :dir() を :lang() に置き換える
    include: Features.LogicalProperties | Features.DirSelector,
    visitor: {
      // var() を含む border-block と border-inline は変換されないので、自分で置き換える
      Declaration: {
        "border-block"(declaration) {
          if (declaration.property === "unparsed") {
            const value = withoutNull(declaration.value.value);
            return [
              { property: "unparsed", value: { propertyId: { property: "border-top" }, value } },
              { property: "unparsed", value: { propertyId: { property: "border-bottom" }, value } },
            ];
          }
        },
        "border-inline"(declaration) {
          if (declaration.property === "unparsed") {
            const value = withoutNull(declaration.value.value);
            return [
              { property: "unparsed", value: { propertyId: { property: "border-right" }, value } },
              { property: "unparsed", value: { propertyId: { property: "border-left" }, value } },
            ];
          }
        },
      },
      // max() の引数がすべて px 値か rem 値の場合は計算した px 値に置き換える
      Function: {
        max(f) {
          const max = Math.max(...f.arguments.filter(isArgument).map(toPx));

          if (Number.isFinite(max)) {
            return { type: "length", value: { unit: "px", value: max } };
          }
        },
      },
    },
  });

  return new TextDecoder().decode(code);
}

const css = forTakumi(mainCss);

/**
 * スタイルシートの @font-face を Takumi に登録するフォントに変換する。
 */
function fontLoaders(specifier: string): FontLoader[] {
  const cssUrl = import.meta.resolve(specifier);
  const fontFaceRules: FontFaceRule[] = [];
  transform({
    filename: specifier,
    code: readFileSync(new URL(cssUrl)),
    visitor: {
      Rule: {
        "font-face"({ value }) {
          fontFaceRules.push(value);
        },
      },
    },
  });

  return fontFaceRules.flatMap(({ properties }, index) => {
    const family = properties.findLast((property) => property.type === "font-family");
    const source = properties
      .findLast((property) => property.type === "source")
      ?.value.find((source) => source.type === "url");
    const ranges = properties
      .findLast((property) => property.type === "unicode-range")
      ?.value.map(({ start, end }): [number, number] => [start, end]);

    if (!family || !source) {
      return [];
    }

    const data = () => readFileSync(new URL(source.value.url.url, cssUrl));

    return [
      ranges
        ? {
            name: `${family.value} ${index}`,
            ranges,
            data,
          }
        : { name: family.value, data },
    ];
  });
}

const fonts: FontLoader[] = [
  ...fontLoaders("@primer/react-brand/fonts/fonts.css"),
  ...fontLoaders("@fontsource-variable/noto-sans-jp/wght.css"),
];

const renderer = new Renderer();

/**
 * React 要素を OG 画像としてレンダリングする。
 * @returns 幅 1,200 ピクセル、高さ 630 ピクセルの PNG 画像
 */
export async function renderOgImage(element: ReactElement): Promise<Uint8Array<ArrayBuffer>> {
  const { node } = await fromJsx(element);

  return renderer.render(node, {
    width: 1200,
    height: 630,
    devicePixelRatio: 1.5,
    format: "png",
    css: [css, ':root { font-feature-settings: "liga" 0 }'],
    fonts,
  });
}
