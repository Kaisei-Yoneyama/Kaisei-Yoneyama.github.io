import { MDXRemote } from "next-mdx-remote/rsc"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { highlight } from "sugar-high"

type TableProps = {
  data: {
    headers: string[]
    rows: string[][]
  }
}

function Table({ data }: TableProps) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  const rows = data.rows.map((row, index) => (
    <tr key={index} className="hover">
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

type CustomLinkProps = React.ComponentPropsWithoutRef<"a">

function CustomLink(props: CustomLinkProps) {
  const href = props.href

  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href?.startsWith("#")) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

type RoundedImageProps = React.ComponentPropsWithoutRef<typeof Image>

function RoundedImage(props: RoundedImageProps) {
  return <Image className="rounded-lg" {...props} />
}

type CodeProps = React.ComponentPropsWithoutRef<"code"> & {
  children: string
}

function Code({ children, ...props }: CodeProps) {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
}

type HeadingProps = {
  children: string
}

function createHeading(level: number) {
  const Heading = ({ children }: HeadingProps) => {
    const slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
}

type CustomMDXProps = React.ComponentProps<typeof MDXRemote>

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
