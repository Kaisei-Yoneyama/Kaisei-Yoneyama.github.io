"use client"

import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  HomeIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"

export default function NotFound() {
  return (
    <section className="flex items-center justify-center min-h-[60vh]">
      <div className="card bg-base-200 card-xl shadow-sm">
        <div className="card-body items-center text-center">
          <ExclamationTriangleIcon className="h-20 w-20 text-warning" />
          <h2 className="card-title">404 - Page Not Found</h2>
          <p>The page you are looking for does not exist.</p>
          <div className="card-actions">
            <Link href="/" className="btn btn-primary">
              <HomeIcon className="h-5 w-5" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn btn-ghost"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
