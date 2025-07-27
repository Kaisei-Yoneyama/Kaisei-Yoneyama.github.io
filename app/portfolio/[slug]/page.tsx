import {
  ArrowTopRightOnSquareIcon,
  CalendarIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline"
import { CustomMDX } from "app/components/mdx"
import { ShareButton } from "app/components/share-button"
import { getDateOnly, getRelativeDateTime } from "app/lib/dayjs"
import { baseUrl } from "app/sitemap"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProjectBySlug, getProjects } from "../utils"

export async function generateStaticParams() {
  const projects = getProjects()

  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) {
    return
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    thumbnail: image,
  } = project.metadata

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/portfolio/${project.slug}`,
      images: [
        {
          url: `${baseUrl}${image}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}${image}`],
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
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
            "@type": "SoftwareApplication",
            name: project.metadata.title,
            datePublished: project.metadata.publishedAt,
            description: project.metadata.summary,
            image: `${baseUrl}${project.metadata.thumbnail}`,
            url: `${baseUrl}/portfolio/${project.slug}`,
            author: {
              "@type": "Person",
              name: "Kaisei Yoneyama",
            },
          }),
        }}
      />

      <div className="breadcrumbs text-sm mb-8">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/portfolio">Portfolio</Link>
          </li>
          <li>{project.metadata.title}</li>
        </ul>
      </div>

      <div className="mb-12">
        {project.metadata.thumbnail && (
          <figure className="rounded-lg overflow-hidden mb-8 bg-base-200 flex items-center justify-center">
            <img
              src={project.metadata.thumbnail}
              alt={project.metadata.title}
              className="w-full h-96 object-contain"
              loading="lazy"
            />
          </figure>
        )}

        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {project.metadata.title}
        </h1>

        <p className="text-xl mb-8 text-base-content/80">
          {project.metadata.summary}
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div
            className="tooltip tooltip-bottom"
            data-tip={getDateOnly(project.metadata.publishedAt)}
          >
            <div className="badge badge-lg badge-ghost gap-2">
              <CalendarIcon className="h-4 w-4" />
              {getRelativeDateTime(project.metadata.publishedAt)}
            </div>
          </div>
          <ShareButton
            title={project.metadata.title}
            url={`${baseUrl}/portfolio/${project.slug}`}
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {project.metadata.demoUrl && (
            <a
              href={project.metadata.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary gap-2"
            >
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              デモを見る
            </a>
          )}
          {project.metadata.repositoryUrl && (
            <a
              href={project.metadata.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline gap-2"
            >
              <CodeBracketIcon className="h-5 w-5" />
              ソースコード
            </a>
          )}
        </div>

        <div className="divider">技術スタック</div>

        <div className="flex flex-wrap gap-2 mb-12">
          {project.metadata.technologies.map((technology) => (
            <div key={technology} className="badge badge-neutral badge-lg">
              {technology}
            </div>
          ))}
        </div>
      </div>

      <article className="prose prose-lg max-w-none">
        <CustomMDX source={project.content} />
      </article>
    </section>
  )
}
