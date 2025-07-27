import { getBlogPosts } from "app/blog/utils"
import { getProjects } from "app/portfolio/utils"

export const baseUrl = "https://Kaisei-Yoneyama.github.io"
export const dynamic = "force-static"

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  const projects = getProjects().map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: project.metadata.releasedAt,
  }))

  const routes = ["", "/blog", "/portfolio"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))

  return [...routes, ...blogs, ...projects]
}
