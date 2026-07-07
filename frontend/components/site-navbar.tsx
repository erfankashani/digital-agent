"use client"

import { Home, FileText, Briefcase, User } from "lucide-react"
import { NavBar } from "@/components/ui/tubelight-navbar"

// Site navigation. Add a `url` to an item once its section/page exists;
// items without a `url` render as non-navigating placeholders.
const navItems = [
  { name: "Home", url: "#", icon: Home },
  { name: "Resume", url: "#resume", icon: FileText },
  { name: "Projects", icon: Briefcase },
  { name: "About", icon: User },
]

export function SiteNavbar() {
  return <NavBar items={navItems} />
}
