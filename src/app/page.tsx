"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheck, Bell, Activity, Weight, HeartPulse, Lock } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 h-16 flex items-center justify-between border-b bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">PetLife</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Login
          </Link>
          <Button asChild className="rounded-full px-6">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6 text-center space-y-8 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance bg-gradient-to-br from-foreground to-primary bg-clip-text text-transparent pb-2">
            Your Pet's Health, <br /> Organized.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Peace of mind for every pet parent. Track vaccinations, appointments, and health records in one secure place.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="rounded-full text-base px-8 h-12 shadow-lg shadow-primary/25" asChild>
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base px-8 h-12" asChild>
              <Link href="/dashboard">View Demo</Link>
            </Button>
          </div>

          {/* Mockup / Visual */}
          <div className="mt-16 relative mx-auto max-w-4xl aspect-video bg-gradient-to-b from-primary/5 to-transparent rounded-2xl border p-2 shadow-2xl">
            <div className="absolute inset-0 bg-background/50 rounded-xl backdrop-blur-sm flex items-center justify-center">
              <span className="text-muted-foreground font-medium">Dashboard Preview</span>
            </div>
            {/* We can replace this with a real image later */}
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="py-24 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-primary">Features</h2>
              <h3 className="text-3xl font-bold">Everything you need</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Health Records */}
              <Card className="md:col-span-1 bg-background/60 backdrop-blur-sm border-primary/10">
                <CardHeader>
                  <Activity className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Digital Health Records</CardTitle>
                  <CardDescription>Never lose a vaccination certificate again.</CardDescription>
                </CardHeader>
              </Card>

              {/* Card 2: Notifications */}
              <Card className="md:col-span-1 bg-background/60 backdrop-blur-sm border-primary/10">
                <CardHeader>
                  <Bell className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Smart Notifications</CardTitle>
                  <CardDescription>Reminders for grooming, meds, and vet visits.</CardDescription>
                </CardHeader>
              </Card>

              {/* Card 3: Secure Data (Tall) */}
              <Card className="md:col-span-1 md:row-span-2 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 flex flex-col justify-between">
                <CardHeader>
                  <ShieldCheck className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">Bank-grade Security</CardTitle>
                  <CardDescription className="text-base">Your data is encrypted and safe. Only you have access to your pet's sensitive information.</CardDescription>
                </CardHeader>
                <div className="p-6">
                  <Lock className="h-32 w-32 text-primary/10 mx-auto" />
                </div>
              </Card>

              {/* Card 4: Weight Tracking (Wide) */}
              <Card className="md:col-span-2 bg-background/60 backdrop-blur-sm border-primary/10">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Weight className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Weight Tracking</CardTitle>
                    <CardDescription>Monitor your pet's growth over time.</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-24 px-6 text-center bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">Start Your Pet's Digital Journal Now</h2>
            <div className="flex justify-center gap-12 text-primary-foreground/80">
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-sm">Pets Managed</p>
              </div>
              <div>
                <p className="text-3xl font-bold">99%</p>
                <p className="text-sm">Happy Owners</p>
              </div>
            </div>
            <Button size="lg" variant="secondary" className="rounded-full px-12 h-14 text-lg font-semibold text-primary" asChild>
              <Link href="/signup">Create Free Account</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} PetLife. All rights reserved.</p>
      </footer>
    </div>
  )
}
