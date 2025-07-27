import { CalendarIcon } from "@heroicons/react/24/outline"
import { getBlogPosts } from "app/blog/utils"
import { CustomMDX } from "app/components/mdx"
import { ShareButton } from "app/components/share-button"
import { getDateOnly, getRelativeDateTime } from "app/lib/dayjs"
import { baseUrl } from "app/sitemap"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />

      <div className="breadcrumbs text-sm mb-8">
        <ul>
          <li>
            <Link href="/">ホーム</Link>
          </li>
          <li>
            <Link href="/blog">ブログ</Link>
          </li>
          <li>{post.metadata.title}</li>
        </ul>
      </div>

      <div className="hero min-h-[40vh] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-box mb-12">
        <div className="hero-content text-center py-16">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {post.metadata.title}
            </h1>
            <p className="text-xl mb-8 text-base-content/80">
              {post.metadata.summary}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div
                className="tooltip tooltip-bottom"
                data-tip={getDateOnly(post.metadata.publishedAt)}
              >
                <div className="badge badge-lg badge-ghost gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {getRelativeDateTime(post.metadata.publishedAt)}
                </div>
              </div>
              <ShareButton
                title={post.metadata.title}
                url={`${baseUrl}/blog/${post.slug}`}
              />
            </div>
          </div>
        </div>
      </div>

      <article className="prose prose-lg max-w-none break-words">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
