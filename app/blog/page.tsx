import { BlogPosts } from "app/components/posts"
import { DocumentTextIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export const metadata = {
  title: "ブログ",
  description: "主に個人開発での学びや経験を記録するブログです。",
}

export default function Page() {
  return (
    <section>
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <Link href="/">ホーム</Link>
          </li>
          <li>ブログ</li>
        </ul>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <DocumentTextIcon className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold">ブログ</h1>
      </div>
      <BlogPosts />
    </section>
  )
}
