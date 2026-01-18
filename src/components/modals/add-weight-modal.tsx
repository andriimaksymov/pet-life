"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Scale, Loader2 } from "lucide-react";
import { z } from "zod";

import { updatePetWeight } from "@/actions/pet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

interface Pet {
  id: string;
  name: string;
}

interface AddWeightModalProps {
  pets: Pet[];
  trigger?: React.ReactNode;
}

const formSchema = z.object({
  petId: z.string().min(1, "Please select a pet"),
  weight: z.coerce.number().min(0.1, "Weight must be greater than 0"),
});

type FormData = z.infer<typeof formSchema>;

export function AddWeightModal({ pets, trigger }: AddWeightModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      petId: pets.length === 1 ? pets[0]?.id ?? "" : "",
      weight: undefined,
    },
  });

  function onSubmit(data: FormData) {
    startTransition(async () => {
      const result = await updatePetWeight(data);
      if (result.error) {
        form.setError("root", { message: result.error });
      } else {
        setOpen(false);
        form.reset();
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Scale className="h-4 w-4" />
            Add Weight
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Log Weight</DialogTitle>
          <DialogDescription>
            Record your pet&apos;s current weight to track their growth.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          { }
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {pets.length > 1 && (
              <FormField
                control={form.control as never}
                name="petId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pet</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pet" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pets.map((pet) => (
                          <SelectItem key={pet.id} value={pet.id}>
                            {pet.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control as never}
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

            {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Weight
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
