import fs from "fs"
import path from "path"

export type Metadata = {
  title: string
  publishedAt: string
  summary: string
  thumbnail: string
  technologies: string[]
  repositoryUrl?: string
  demoUrl?: string
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  const frontMatterBlock = match![1]
  const content = fileContent.replace(frontmatterRegex, "").trim()
  const frontMatterLines = frontMatterBlock.trim().split("\n")
  const metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ")
    let value = valueArr.join(": ").trim()

    // FIXME: `technologies` が複数行の場合にも対応する
    if (key.trim() === "technologies") {
      const arrayMatch = value.match(/^\[(.*)\]$/)
      if (arrayMatch) {
        metadata.technologies = arrayMatch[1]
          .split(",")
          .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
          .filter((item) => item.length > 0)
      }
    } else {
      value = value.replace(/^['"](.*)['"]$/, "$1")
      const trimmedKey = key.trim() as keyof Metadata

      if (trimmedKey !== "technologies") {
        metadata[trimmedKey] = value
      }
    }
  })

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx")
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8")
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getProjects() {
  return getMDXData(
    path.join(process.cwd(), "app", "portfolio", "projects"),
  ).sort((a, b) => {
    const dateA = new Date(a.metadata.publishedAt)
    const dateB = new Date(b.metadata.publishedAt)
    return dateB.getTime() - dateA.getTime()
  })
}

export function getProjectBySlug(slug: string) {
  const projects = getProjects()
  return projects.find((project) => project.slug === slug)
}
