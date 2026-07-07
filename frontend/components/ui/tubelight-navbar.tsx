"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn, scrollToHash } from "@/lib/utils"

interface NavItem {
  name: string
  icon: LucideIcon
  /** Omit for items whose page/section doesn't exist yet (renders as a non-navigating placeholder). */
  url?: string
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 sm:bottom-auto left-1/2 -translate-x-1/2 z-50 mb-6 sm:mb-0 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          const content = (
            <>
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-indigo-400/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-300 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-indigo-300/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-indigo-300/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-indigo-300/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </>
          )

          const baseClasses = cn(
            "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
            "text-white/70 hover:text-white",
            isActive && "bg-white/[0.08] text-white",
          )

          // Items without a url are placeholders (page/section not built yet):
          // render a button that still reflects active state but doesn't navigate.
          return item.url ? (
            <Link
              key={item.name}
              href={item.url}
              onClick={(e) => {
                setActiveTab(item.name)
                // Handle in-page anchors ourselves for reliable single-click
                // smooth scrolling (the router's hash handling can need two).
                if (item.url!.startsWith("#")) {
                  e.preventDefault()
                  scrollToHash(item.url!)
                }
              }}
              className={baseClasses}
            >
              {content}
            </Link>
          ) : (
            <button
              key={item.name}
              type="button"
              onClick={() => setActiveTab(item.name)}
              className={baseClasses}
            >
              {content}
            </button>
          )
        })}
      </div>
    </div>
  )
}
