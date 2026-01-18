"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, Loader2, Plus, ArrowLeft, ArrowRight, Check } from "lucide-react";

import {
  PetStep1Schema,
  PetStep2Schema,
  PetSchema,
  PetInput,
  PetStep1Input,
  PetStep2Input,
  SPECIES_OPTIONS,
  GENDER_OPTIONS,
} from "@/schemas/pet";
import { createPet } from "@/actions/pet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ImageDropzone } from "@/components/ui/image-dropzone";
import { BreedCombobox } from "@/components/ui/breed-combobox";
import { cn } from "@/lib/utils";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export function AddPetModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isPending, startTransition] = useTransition();

  // Step 1 form
  const step1Form = useForm<PetStep1Input>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(PetStep1Schema) as any,
    defaultValues: {
      name: "",
      species: "DOG",
      breed: "",
      photoUrl: "",
    },
  });

  // Step 2 form
  const step2Form = useForm<PetStep2Input>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(PetStep2Schema) as any,
    defaultValues: {
      gender: "UNKNOWN",
      isNeutered: false,
      allergies: [],
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const step1Control = step1Form.control as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const step2Control = step2Form.control as any;

  const handleNext = async () => {
    const isValid = await step1Form.trigger();
    if (isValid) {
      setDirection(1);
      setStep(2);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(1);
  };

  const handleSubmit = () => {
    const step1Data = step1Form.getValues();
    const step2Data = step2Form.getValues();

    const fullData: PetInput = {
      ...step1Data,
      ...step2Data,
    };

    startTransition(async () => {
      const result = await createPet(fullData);
      if (result.error) {
        step2Form.setError("root", { message: result.error });
      } else {
        setOpen(false);
        resetForms();
      }
    });
  };

  const resetForms = () => {
    step1Form.reset();
    step2Form.reset();
    setStep(1);
    setDirection(0);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      resetForms();
    }
  };

  const selectedSpecies = step1Form.watch("species");

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Pet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Add a New Pet</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Let's start with your pet's identity."
              : "Now, let's add some health details."}
          </DialogDescription>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 py-2">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
              step >= 1
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {step > 1 ? <Check className="h-4 w-4" /> : "1"}
          </div>
          <div
            className={cn(
              "h-1 w-12 rounded-full transition-colors",
              step >= 2 ? "bg-primary" : "bg-muted"
            )}
          />
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
              step >= 2
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            2
          </div>
        </div>

        {/* Animated step content */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            {step === 1 ? (
              <Form {...step1Form}>
                <form className="space-y-4">
                  {/* Photo Upload */}
                  <FormField
                    control={step1Control}
                    name="photoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Photo</FormLabel>
                        <FormControl>
                          <ImageDropzone
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Name */}
                  <FormField
                    control={step1Control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Max" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Species */}
                  <FormField
                    control={step1Control}
                    name="species"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Species</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select species" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SPECIES_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <span className="flex items-center gap-2">
                                  <span>{option.emoji}</span>
                                  <span>{option.label}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Breed */}
                  <FormField
                    control={step1Control}
                    name="breed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Breed (Optional)</FormLabel>
                        <FormControl>
                          <BreedCombobox
                            value={field.value}
                            species={selectedSpecies}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            ) : (
              <Form {...step2Form}>
                <form className="space-y-4">
                  {/* Gender */}
                  <FormField
                    control={step2Control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <ToggleGroup
                            type="single"
                            value={field.value}
                            onValueChange={(value) => value && field.onChange(value)}
                            className="w-full"
                          >
                            {GENDER_OPTIONS.map((option) => (
                              <ToggleGroupItem
                                key={option.value}
                                value={option.value}
                                className="flex-1"
                              >
                                <span className="mr-1">{option.icon}</span>
                                {option.label}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Birth Date */}
                  <FormField
                    control={step2Control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    {/* Weight */}
                    <FormField
                      control={step2Control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="5.5"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Neutered Toggle */}
                    <FormField
                      control={step2Control}
                      name="isNeutered"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Neutered/Spayed</FormLabel>
                          <FormControl>
                            <ToggleGroup
                              type="single"
                              value={field.value ? "yes" : "no"}
                              onValueChange={(value) =>
                                field.onChange(value === "yes")
                              }
                              className="w-full"
                            >
                              <ToggleGroupItem value="no" className="flex-1">
                                No
                              </ToggleGroupItem>
                              <ToggleGroupItem value="yes" className="flex-1">
                                Yes
                              </ToggleGroupItem>
                            </ToggleGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Allergies - simple comma-separated input for now */}
                  <FormField
                    control={step2Control}
                    name="allergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allergies (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Chicken, pollen..."
                            value={field.value?.join(", ") || ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  .split(",")
                                  .map((s) => s.trim())
                                  .filter(Boolean)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {step2Form.formState.errors.root && (
                    <p className="text-sm font-medium text-destructive">
                      {step2Form.formState.errors.root.message}
                    </p>
                  )}
                </form>
              </Form>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between pt-4">
          {step === 1 ? (
            <>
              <div />
              <Button type="button" onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="button" onClick={handleSubmit} disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Pet
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
