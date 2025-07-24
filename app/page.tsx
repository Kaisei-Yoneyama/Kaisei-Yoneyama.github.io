import { BlogPosts } from "app/components/posts"

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

      <div className="divider">最近の投稿</div>

      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
