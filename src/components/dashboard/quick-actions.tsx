"use client";

import { Pill, Scale, Calendar, ExternalLink } from "lucide-react";
import { AddWeightModal } from "@/components/modals/add-weight-modal";
import { LogMedicationModal } from "@/components/modals/log-medication-modal";
import { Button } from "@/components/ui/button";

interface Pet {
  id: string;
  name: string;
}

interface QuickActionsProps {
  pets: Pet[];
}

export function QuickActions({ pets }: QuickActionsProps) {
  const hasPets = pets.length > 0;

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <LogMedicationModal
        pets={pets}
        trigger={
          <Button
            variant="outline"
            className="gap-2 shrink-0 border-dashed hover:border-solid hover:bg-primary/5"
            disabled={!hasPets}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
              <Pill className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="font-medium">Log Medication</span>
          </Button>
        }
      />
      <AddWeightModal
        pets={pets}
        trigger={
          <Button
            variant="outline"
            className="gap-2 shrink-0 border-dashed hover:border-solid hover:bg-primary/5"
            disabled={!hasPets}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Scale className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-medium">Add Weight</span>
          </Button>
        }
      />
      <Button
        variant="outline"
        className="gap-2 shrink-0 border-dashed hover:border-solid hover:bg-primary/5"
        disabled={!hasPets}
        asChild
      >
        <a href="https://www.google.com/search?q=vet+near+me" target="_blank" rel="noopener noreferrer">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <span className="font-medium">Book Vet</span>
          <ExternalLink className="h-3 w-3 opacity-50" />
        </a>
      </Button>
    </div>
  );
}
