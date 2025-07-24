# Kaisei-Yoneyama.github.io

@​Kaisei-Yoneyama のポートフォリオサイト。  
Next.js の SSG で構築して GitHub Pages にデプロイする。

## 技術スタック

![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript) ![Next.js](https://img.shields.io/badge/Next.js-15.4.2-000000?style=for-the-badge&logo=nextdotjs) ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-06B6D4?style=for-the-badge&logo=tailwindcss) ![daisyUI](https://img.shields.io/badge/DaisyUI-5.0.46-5A0EF8?style=for-the-badge&logo=daisyui)

## 機能

- ブログ: MDX 対応
- SEO: サイトマップ生成/JSON-LD 構造化データ生成/`robots.txt`

## 開発

### 動作確認

```bash
npm install # 依存関係をインストール
npm run dev # 開発サーバーを起動
```

### npm スクリプト

- `npm run dev`: 開発サーバーを起動する
- `npm run build`: 本番用にプロジェクトをビルドする
- `npm run serve`: 本番用にビルドしたプロジェクトを確認する
- `npm run lint`: ESLint でコードをチェックする
- `npm run lint:fix`: ESLint でコードを修正する
- `npm run format`: Prettier でコードをチェックする
- `npm run format:fix`: Prettier でコードを整形する

### デプロイ

`main` ブランチにプッシュすると GitHub Pages にデプロイを行うワークフローが実行される。

- `.github/workflows/deploy.yml`
