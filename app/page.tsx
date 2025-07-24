import { BlogPosts } from "app/components/posts"

export default function Page() {
  return (
    <section>
      <div className="hero bg-base-200 rounded-box mb-8">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">My Portfolio</h1>
            <p className="py-6">
              I&apos;m a Vim enthusiast and tab advocate, finding unmatched
              efficiency in Vim&apos;s keystroke commands and tabs&apos;
              flexibility for personal viewing preferences. This extends to my
              support for static typing, where its early error detection ensures
              cleaner code, and my preference for dark mode, which eases long
              coding sessions by reducing eye strain.
            </p>
          </div>
        </div>
      </div>

      <div className="divider">Recent Posts</div>

      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
