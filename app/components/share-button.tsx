"use client"

import { CheckIcon, ShareIcon } from "@heroicons/react/24/outline"
import { clsx } from "clsx"
import { useState } from "react"

interface ShareButtonProps {
  title: string
  url: string
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url,
        })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(setCopied, 2000, false)
      }
    } catch (error) {
      console.log("Share cancelled or failed:", error)
    }
  }

  return (
    <div
      className="tooltip tooltip-bottom"
      data-tip={copied ? "Copied!" : "Share"}
    >
      <button
        onClick={handleShare}
        className={clsx(
          "btn btn-circle btn-ghost transition-all",
          copied && "btn-success",
        )}
        aria-label="Share"
      >
        {copied ? (
          <CheckIcon className="h-5 w-5 animate-bounce" />
        ) : (
          <ShareIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  )
}
