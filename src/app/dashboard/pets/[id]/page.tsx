import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Weight, Activity } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AddHealthRecordModal } from "@/components/modals/add-health-record-modal";
import { WeightChart } from "@/components/weight-chart";
import { format } from "date-fns";

interface PetDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PetDetailsPage({ params }: PetDetailsPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;

  const pet = await db.pet.findUnique({
    where: {
      id: id,
      userId: session.user.id,
    },
    include: {
        healthRecords: {
            orderBy: {
                date: 'desc'
            }
        }
    }
  });

  if (!pet) {
    notFound();
  }

  // Extract weight data from health records (flexible metadata) plus current weight
  // Explicitly cast to prevent type errors if Prisma client types are stale in IDE
  const healthRecords = pet.healthRecords as unknown as Array<{
      id: string;
      type: string;
      title: string;
      date: Date;
      notes: string | null;
      metadata: Record<string, unknown> | null;
  }>;

  const weightData = healthRecords
    .filter((r) => r.type === "VISIT" || r.metadata?.weight)
    .map((r) => {
        const weight = r.metadata?.weight as string | undefined;
        return {
            date: r.date,
            weight: weight ? parseFloat(weight) : 0
        };
    })
    .filter((d) => d.weight > 0);

  // If pet has current weight, add it as "today" if no recent record? 
  // For now, let's just use records. If records empty but pet has weight, maybe add that?
  if (weightData.length === 0 && pet.weight) {
      weightData.push({ date: pet.updatedAt, weight: pet.weight });
  }

  return (
    <div className="space-y-6">
      {/* Header / Nav */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{pet.name}</h1>
      </div>

      {/* Main Info Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile & Weight Section */}
        <div className="md:col-span-1 space-y-6">
            <Card>
            <CardHeader>
                <div className="mx-auto h-32 w-32 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center mb-4 ring-4 ring-background shadow-xl">
                {pet.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={pet.photoUrl} alt={pet.name} className="h-full w-full object-cover" />
                ) : (
                    <span className="text-6xl">{pet.species === "DOG" ? "🐕" : pet.species === "CAT" ? "🐈" : pet.species === "RABBIT" ? "🐰" : pet.species === "BIRD" ? "🐦" : pet.species === "REPTILE" ? "🦎" : "🐾"}</span>
                )}
                </div>
                <CardTitle className="text-center text-2xl">{pet.name}</CardTitle>
                <p className="text-center text-muted-foreground">{pet.breed || pet.species}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                    <span className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" /> Birthdate
                    </span>
                    <span className="font-medium">
                        {pet.birthDate ? format(pet.birthDate, "PPP") : "Unknown"}
                    </span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                    <span className="flex items-center gap-2 text-muted-foreground">
                        <Weight className="h-4 w-4" /> Weight
                    </span>
                    <span className="font-medium">
                        {pet.weight ? `${pet.weight} kg` : "Unknown"}
                    </span>
                </div>
            </CardContent>
            </Card>

            {/* Weight Chart */}
            <WeightChart data={weightData} />
        </div>

        {/* Health & Actions Section */}
        <div className="md:col-span-2 space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" /> Health Overview
                    </CardTitle>
                    <AddHealthRecordModal petId={pet.id} />
                </CardHeader>
                <CardContent>
                    {pet.healthRecords.length === 0 ? (
                         <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                            <p>No health records yet.</p>
                            <p className="text-sm">Log vaccinations, visits, or medications.</p>
                        </div>
                    ) : (
                        <div className="pl-4 border-l-2 border-muted space-y-8 relative">
                           {healthRecords.map((record) => (
                               <div key={record.id} className="relative pl-6">
                                   {/* Timeline Dot */}
                                   <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full border-2 border-background bg-primary" />
                                   
                                   <div className="space-y-1">
                                       <div className="flex items-center gap-2">
                                           <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                                               {record.type}
                                           </span>
                                           <span className="text-sm text-muted-foreground">
                                               {format(record.date, "PPP")}
                                           </span>
                                       </div>
                                       <h4 className="font-semibold text-lg">{record.title}</h4>
                                       {record.notes && (
                                           <p className="text-muted-foreground text-sm">{record.notes}</p>
                                       )}
                                   </div>
                               </div>
                           ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
