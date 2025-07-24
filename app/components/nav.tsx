"use client"

import {
  Bars3Icon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  HomeIcon,
  MoonIcon,
  RocketLaunchIcon,
  SunIcon,
} from "@heroicons/react/24/outline"
import { clsx } from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "../hooks/use-theme"

type NavItem = {
  name: string
  icon: typeof HomeIcon
}

const navItems: Record<string, NavItem> = {
  "/": {
    name: "home",
    icon: HomeIcon,
  },
  "/blog": {
    name: "blog",
    icon: DocumentTextIcon,
  },
  "https://vercel.com/templates/next.js/portfolio-starter-kit": {
    name: "deploy",
    icon: RocketLaunchIcon,
  },
}

export function Navbar() {
  const pathname = usePathname()
  const { theme, changeTheme } = useTheme()

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Bars3Icon className="h-5 w-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {Object.entries(navItems).map(([path, { name, icon: Icon }]) => {
              const isActive = pathname === path
              return (
                <li key={path}>
                  <Link href={path} className={clsx(isActive && "active")}>
                    <Icon className="h-4 w-4" />
                    {name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          Portfolio
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {Object.entries(navItems).map(([path, { name, icon: Icon }]) => {
            const isActive = pathname === path
            return (
              <li key={path}>
                <Link href={path} className={clsx(isActive && "active")}>
                  <Icon className="h-4 w-4" />
                  {name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            {theme === "light" ? (
              <SunIcon className="h-5 w-5" />
            ) : theme === "dark" ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <ComputerDesktopIcon className="h-5 w-5" />
            )}
          </div>
          <ul
            tabIndex={0}
            className="menu p-2 shadow bg-base-100 rounded-box w-52 dropdown-content z-[1]"
          >
            <li>
              <button
                onClick={() => changeTheme("light")}
                className={clsx(theme === "light" && "active")}
              >
                <SunIcon className="h-4 w-4" />
                Light
              </button>
            </li>
            <li>
              <button
                onClick={() => changeTheme("dark")}
                className={clsx(theme === "dark" && "active")}
              >
                <MoonIcon className="h-4 w-4" />
                Dark
              </button>
            </li>
            <li>
              <button
                onClick={() => changeTheme("system")}
                className={clsx(theme === "system" && "active")}
              >
                <ComputerDesktopIcon className="h-4 w-4" />
                System
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
