'use client';

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between border-b px-4 py-3 bg-white shadow-sm gap-2">
      {/* Left: Menu & Title */}
      <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
        {/* Hamburger on mobile only */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>

        {/* Title */}
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-700 leading-snug">
          Scalable Job Importer with Queue Processing & History Tracking
        </h1>
      </div>

      {/* Right: User greeting */}
      <div className="text-sm text-muted-foreground ml-auto md:ml-0">
        Welcome, Ashish
      </div>
    </header>
  );
}
