import { ArrowRightIcon, CalendarIcon } from "@heroicons/react/24/outline"
import { formatDate, getBlogPosts } from "app/blog/utils"
import Link from "next/link"

export function BlogPosts() {
  const allBlogs = getBlogPosts()

  const sortedBlogs = allBlogs.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  )

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
      {sortedBlogs.map((post, index) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <div className="card lg:card-side bg-base-100 shadow-sm hover:shadow-md">
            {post.metadata.image && (
              <figure className="lg:w-2/5">
                <img
                  src={post.metadata.image}
                  alt={post.metadata.title}
                  className="h-full w-full object-cover"
                />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title">{post.metadata.title}</h2>
              <p className="opacity-70 line-clamp-2">{post.metadata.summary}</p>
              <div className="card-actions justify-between">
                <div className="text-sm opacity-60">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {formatDate(post.metadata.publishedAt, false)}
                  </span>
                </div>
                <button className="btn btn-primary btn-sm">
                  記事を読む
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
