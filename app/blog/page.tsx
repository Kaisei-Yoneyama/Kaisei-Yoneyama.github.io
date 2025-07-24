import { BlogPosts } from "app/components/posts"
import { DocumentTextIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
}

export default function Page() {
  return (
    <section>
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>Blog</li>
        </ul>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <DocumentTextIcon className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold">My Blog</h1>
      </div>
      <BlogPosts />
    </section>
  )
}
