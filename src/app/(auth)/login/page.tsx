"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { PawPrint } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

export default function LoginPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
    // TODO: Implement actual login logic
  }

  return (
    <Card className="w-full bg-background/80 backdrop-blur-xl border-border/50 shadow-2xl">
      <CardHeader className="text-center space-y-1">
        <div className="flex justify-center mb-4">
           <div className="p-3 bg-primary/20 rounded-full">
              <PawPrint className="h-8 w-8 text-primary" />
           </div>
        </div>
        <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
        <CardDescription>
          Sign in to manage every pet&apos;s health parent.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} className="bg-background/50 border-input/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                   <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} className="bg-background/50 border-input/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="flex justify-between items-center text-sm">
                 <Link href="/forgot-password" className="text-muted-foreground hover:text-primary transition-colors">
                    Forgot Password?
                 </Link>
             </div>
            <Button type="submit" className="w-full h-11 text-base rounded-lg shadow-lg shadow-primary/20 font-semibold" size="lg">
              Sign In
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted-foreground/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full">
             Google
          </Button>
          <Button variant="outline" className="w-full">
             Apple
          </Button>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
         <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">
               Sign Up
            </Link>
         </p>
      </CardFooter>
    </Card>
  )
}
