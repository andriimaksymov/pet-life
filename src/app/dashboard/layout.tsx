import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-muted/40 font-sans">
      <AppSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8 overflow-y-auto">
          {children}
        </main>
        <MobileNav />
      </div>
    </div>
  )
}
