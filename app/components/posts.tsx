import { ArrowRightIcon, CalendarIcon } from "@heroicons/react/24/outline"
import { getBlogPosts } from "app/blog/utils"
import { getDateOnly, getRelativeDateTime } from "app/lib/dayjs"
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
      {sortedBlogs.map((post) => (
        <div
          key={post.slug}
          className="card lg:card-side bg-base-100 shadow-xl"
        >
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
              <div className="text-sm">
                <div
                  className="tooltip tooltip-bottom"
                  data-tip={getDateOnly(post.metadata.publishedAt)}
                >
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    {getRelativeDateTime(post.metadata.publishedAt)}
                  </span>
                </div>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="btn btn-primary btn-sm"
              >
                記事を読む
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
