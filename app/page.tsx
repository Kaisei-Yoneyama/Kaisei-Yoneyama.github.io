import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { BlogPosts } from "app/components/posts"
import { Projects } from "app/components/projects"
import Link from "next/link"

export default function Page() {
  return (
    <section>
      <div className="hero bg-base-200 rounded-box mb-8">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Kaisei Yoneyama</h1>
            <p className="py-6">
              とくに Web
              アプリケーションや業務改善ツールの開発が好きです。プログラミング教材制作に携わっています。
            </p>
          </div>
        </div>
      </div>

      <div className="divider">ポートフォリオ</div>

      <div className="my-8">
        <Projects limit={2} />
        <div className="text-center mt-6">
          <Link href="/portfolio" className="btn btn-primary btn-outline">
            他の作品も見る
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="divider">ブログ</div>

      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
