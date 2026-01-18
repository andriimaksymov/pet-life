"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// Common breeds by species
const BREEDS: Record<string, string[]> = {
  DOG: [
    "Labrador Retriever",
    "German Shepherd",
    "Golden Retriever",
    "French Bulldog",
    "Bulldog",
    "Poodle",
    "Beagle",
    "Rottweiler",
    "Dachshund",
    "Yorkshire Terrier",
    "Boxer",
    "Siberian Husky",
    "Shih Tzu",
    "Chihuahua",
    "Border Collie",
    "Mixed Breed",
    "Other",
  ],
  CAT: [
    "Persian",
    "Maine Coon",
    "Ragdoll",
    "British Shorthair",
    "Siamese",
    "Abyssinian",
    "Bengal",
    "Sphynx",
    "Scottish Fold",
    "Russian Blue",
    "Birman",
    "American Shorthair",
    "Norwegian Forest Cat",
    "Mixed Breed",
    "Other",
  ],
  RABBIT: [
    "Holland Lop",
    "Netherland Dwarf",
    "Mini Rex",
    "Lionhead",
    "Flemish Giant",
    "Dutch",
    "English Lop",
    "Angora",
    "Mixed Breed",
    "Other",
  ],
  BIRD: [
    "Budgerigar",
    "Cockatiel",
    "African Grey",
    "Macaw",
    "Cockatoo",
    "Lovebird",
    "Canary",
    "Finch",
    "Conure",
    "Other",
  ],
  REPTILE: [
    "Ball Python",
    "Corn Snake",
    "Leopard Gecko",
    "Bearded Dragon",
    "Red-Eared Slider",
    "Chameleon",
    "Iguana",
    "Blue-Tongued Skink",
    "Other",
  ],
  OTHER: ["Other"],
};

interface BreedComboboxProps {
  value?: string;
  species?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function BreedCombobox({
  value,
  species = "DOG",
  onChange,
  className,
}: BreedComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const breeds = BREEDS[species] ?? BREEDS.OTHER ?? [];
  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {value || "Select breed..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <div className="p-2">
          <Input
            placeholder="Search breeds..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9"
          />
        </div>
        <ScrollArea className="h-[200px]">
          <div className="px-1 pb-1">
            {filteredBreeds.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No breeds found. Type to add custom.
              </div>
            ) : (
              filteredBreeds.map((breed) => (
                <button
                  key={breed}
                  type="button"
                  onClick={() => {
                    onChange(breed === value ? "" : breed);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={cn(
                    "flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
                    value === breed && "bg-accent text-accent-foreground"
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === breed ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {breed}
                </button>
              ))
            )}
            {search && !breeds.includes(search) && (
              <button
                type="button"
                onClick={() => {
                  onChange(search);
                  setOpen(false);
                  setSearch("");
                }}
                className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground text-primary"
              >
                <span className="mr-2">+</span>
                Add &quot;{search}&quot;
              </button>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
