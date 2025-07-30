import { FolderIcon } from "@heroicons/react/24/outline"
import { Projects } from "app/components/projects"
import Link from "next/link"

export const metadata = {
  title: "ポートフォリオ",
  description: "とくに印象に残っているプロジェクトを紹介しています。",
}

export default function PortfolioPage() {
  return (
    <section>
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <Link href="/">ホーム</Link>
          </li>
          <li>ポートフォリオ</li>
        </ul>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <FolderIcon className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold">ポートフォリオ</h1>
      </div>

      <p className="text-sm text-base-content/60 mb-6">
        とくに印象に残っているプロジェクトを紹介しています。
        <br />
        Web スクレイピングやボットの開発なども趣味です。
      </p>

      <Projects />
    </section>
  )
}
