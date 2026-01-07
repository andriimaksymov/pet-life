"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PawPrint, Calendar, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Pets", href: "/dashboard/pets", icon: PawPrint },
  { name: "Health", href: "/dashboard/health", icon: Calendar },
  { name: "Profile", href: "/dashboard/profile", icon: User },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background md:hidden z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full text-xs gap-1 transition-colors hover:bg-muted/50",
              pathname === item.href
                ? "text-primary font-medium"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
