import { CodeBracketIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <Link href="/" className="link link-hover">
          home
        </Link>
        <Link href="/blog" className="link link-hover">
          blog
        </Link>
        <a
          href="https://vercel.com/templates/next.js/portfolio-starter-kit"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          deploy
        </a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://github.com/vercel/next.js"
            target="_blank"
            rel="noopener noreferrer"
            title="github"
          >
            <CodeBracketIcon className="h-6 w-6" />
          </a>
          <a
            href="https://vercel.com/templates/next.js/portfolio-starter-kit"
            target="_blank"
            rel="noopener noreferrer"
            title="view source"
          >
            <CodeBracketIcon className="h-6 w-6" />
          </a>
        </div>
      </nav>
      <aside>
        <p>© {new Date().getFullYear()} MIT Licensed</p>
      </aside>
    </footer>
  )
}
