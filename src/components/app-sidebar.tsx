"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PawPrint, Calendar, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "My Pets", href: "/dashboard/pets", icon: PawPrint },
  { name: "Health", href: "/dashboard/health", icon: Calendar },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-64 lg:w-72 h-screen sticky top-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <PawPrint className="h-6 w-6" />
            <span className="">PetLife</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-2 py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                asChild
                className="justify-start gap-2"
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </div>
  )
}
