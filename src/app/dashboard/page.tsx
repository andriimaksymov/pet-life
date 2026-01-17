import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Bell, LogOut } from "lucide-react"
import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {session.user.name || session.user.email}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your pets and their health records
          </p>
        </div>
        <div className="flex gap-2">
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <Button variant="outline" type="submit">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </form>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Pet
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Pets Section */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>My Pets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
              <p className="mb-2">No pets added yet.</p>
              <Button variant="outline" size="sm">Add your first pet</Button>
            </div>
            {/* Placeholder for future list */}
          </CardContent>
        </Card>

        {/* Reminders Section */}
        <Card className="col-span-1">
          <CardHeader>
             <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" /> Upcoming Reminders
             </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 rounded-md border p-3 bg-accent/10">
                   <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Max - Vaccination</p>
                      <p className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</p>
                   </div>
                   <div className="h-2 w-2 rounded-full bg-orange-500" />
                </div>
                <div className="flex items-center justify-between gap-4 rounded-md border p-3">
                   <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Bella - Grooming</p>
                      <p className="text-xs text-muted-foreground">Sat, Jan 12</p>
                   </div>
                   <div className="h-2 w-2 rounded-full bg-blue-500" />
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
