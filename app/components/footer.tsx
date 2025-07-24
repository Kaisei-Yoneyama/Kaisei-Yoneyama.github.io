import { CodeBracketIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <Link href="/" className="link link-hover">
          ホーム
        </Link>
        <Link href="/blog" className="link link-hover">
          ブログ
        </Link>
        <a
          href="https://github.com/Kaisei-Yoneyama"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          GitHub
        </a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://github.com/Kaisei-Yoneyama"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <CodeBracketIcon className="h-6 w-6" />
          </a>
        </div>
      </nav>
      <aside>
        <p>© {new Date().getFullYear()} Kaisei Yoneyama</p>
      </aside>
    </footer>
  )
}
