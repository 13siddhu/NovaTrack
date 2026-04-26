"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowRight, CheckCircle2, TrendingUp, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <Briefcase className="h-6 w-6 mr-2 text-primary" />
          <span className="font-bold text-xl">NovaTrack</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <ThemeToggle />
          <Link className="text-sm font-medium hover:text-primary transition-colors hidden sm:block" href="#features">
            Features
          </Link>
          {mounted && isLoggedIn ? (
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center bg-grid-white/[0.02] bg-grid-black/[0.02] relative">
          <div className="absolute inset-0 bg-background/80 bg-gradient-to-br from-background via-background/90 to-primary/10 -z-10" />
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mb-4 bg-primary/10 text-primary border-primary/20">
                  Introducing NovaTrack 1.0
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                  Smart Job Application <br /> Tracking for Professionals
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                  Take control of your career journey. Track applications, schedule interviews, and never miss a follow-up with our intelligent dashboard.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                {mounted && isLoggedIn ? (
                  <Link href="/dashboard">
                    <Button size="lg" className="h-12 px-8 text-base">
                      Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/signup">
                      <Button size="lg" className="h-12 px-8 text-base">
                        Start Tracking Free <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40 border-y">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Everything you need to land the job</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A complete suite of tools designed to organize your job search and boost your hiring success rate.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col justify-center space-y-4 bg-card p-6 rounded-2xl border shadow-sm h-full hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Centralized Tracking</h3>
                <p className="text-muted-foreground">Keep all your job applications in one place. No more messy spreadsheets.</p>
              </div>
              <div className="flex flex-col justify-center space-y-4 bg-card p-6 rounded-2xl border shadow-sm h-full hover:shadow-md transition-shadow">
                <div className="bg-blue-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Actionable Analytics</h3>
                <p className="text-muted-foreground">Visualize your progress with insightful charts and conversion rates.</p>
              </div>
              <div className="flex flex-col justify-center space-y-4 bg-card p-6 rounded-2xl border shadow-sm h-full hover:shadow-md transition-shadow">
                <div className="bg-yellow-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold">Smart Reminders</h3>
                <p className="text-muted-foreground">Get automated notifications when it's time to follow up with recruiters.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2026 NovaTrack. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
