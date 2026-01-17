import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button"
import { Bell, LogOut } from "lucide-react"
import { AddPetModal } from "@/components/modals/add-pet-modal"
import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const pets = await db.pet.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="flex items-center gap-2">
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <Button variant="outline" type="submit">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Pets Card */}
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">My Pets</CardTitle>
            <AddPetModal />
          </CardHeader>
          <CardContent>
            {pets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <p>No pets added yet.</p>
                <p className="text-sm">Add your first pet to get started!</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pets.map((pet) => (
                  <div
                    key={pet.id}
                    className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                      {pet.species === "Dog" ? "🐕" : pet.species === "Cat" ? "🐈" : "🐾"}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{pet.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {pet.breed || pet.species}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
