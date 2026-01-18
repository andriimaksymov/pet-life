import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { SPECIES_OPTIONS } from "@/schemas/pet";

interface HealthRecord {
  id: string;
  type: string;
  date: Date;
}

interface SmartPetCardProps {
  pet: {
    id: string;
    name: string;
    species: string;
    breed: string | null;
    photoUrl: string | null;
    updatedAt: Date;
  };
  healthRecords: HealthRecord[];
  vaccinationCount: number;
  expectedVaccinations?: number;
}

export function SmartPetCard({
  pet,
  healthRecords,
  vaccinationCount,
  expectedVaccinations = 5,
}: SmartPetCardProps) {
  // Calculate health score based on vaccination completion
  const healthScore = Math.min(
    100,
    Math.round((vaccinationCount / expectedVaccinations) * 100)
  );

  // Get last activity
  const lastRecord = healthRecords[0];
  const lastActivity = lastRecord
    ? `${lastRecord.type.toLowerCase()}: ${formatDistanceToNow(new Date(lastRecord.date), { addSuffix: true })}`
    : `Updated ${formatDistanceToNow(new Date(pet.updatedAt), { addSuffix: true })}`;

  // Get species emoji
  const speciesOption = SPECIES_OPTIONS.find((s) => s.value === pet.species);
  const emoji = speciesOption?.emoji || "🐾";

  // Determine health score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500 stroke-green-500";
    if (score >= 50) return "text-yellow-500 stroke-yellow-500";
    return "text-red-500 stroke-red-500";
  };

  const scoreColor = getScoreColor(healthScore);
  const circumference = 2 * Math.PI * 16; // radius = 16
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <Link
      href={`/dashboard/pets/${pet.id}`}
      className="block transition-transform hover:scale-[1.02]"
    >
      <div className="relative flex items-center space-x-4 rounded-xl border p-4 hover:bg-accent/50 transition-all hover:shadow-md">
        {/* Pet Avatar */}
        <div className="relative">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl shadow-inner overflow-hidden">
            {pet.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={pet.photoUrl}
                alt={pet.name}
                className="h-full w-full object-cover"
              />
            ) : (
              emoji
            )}
          </div>

          {/* Health score badge */}
          <div className="absolute -bottom-1 -right-1">
            <div className="relative flex items-center justify-center">
              <svg className="h-8 w-8 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-muted"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className={scoreColor}
                  strokeWidth="3"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <span
                className={`absolute text-[9px] font-bold ${scoreColor}`}
              >
                {healthScore}
              </span>
            </div>
          </div>
        </div>

        {/* Pet Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-base font-semibold leading-none truncate">
              {pet.name}
            </p>
            {vaccinationCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 text-[10px] font-medium text-green-700 dark:text-green-400">
                {vaccinationCount} vax
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {pet.breed || speciesOption?.label || "Pet"}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1 capitalize truncate">
            {lastActivity}
          </p>
        </div>

        {/* Status indicators */}
        <div className="flex flex-col items-end gap-1">
          {healthScore < 50 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 text-[10px] font-medium text-orange-700 dark:text-orange-400">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              Due
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
