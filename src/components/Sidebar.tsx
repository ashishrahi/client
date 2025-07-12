'use client';

import { LayoutDashboard, ImportIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Import Logs",
    href: "/import-logs",
    icon: <ImportIcon size={20} />,
  },
 
];

export function Sidebar() {
  const [open, setOpen] = useState(false);

  const navLinks = (
    <nav className="space-y-1 px-4">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setOpen(false)} // close drawer on click
          className={cn(
            "flex items-center gap-3 p-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
          )}
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r h-screen hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold tracking-tight">YourApp</div>
        {navLinks}
      </aside>

      {/* Mobile/Tablet Drawer */}
      <div className="md:hidden p-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="text-muted-foreground hover:text-primary transition"
              aria-label="Open menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-0">
            <div className="p-6 text-xl font-bold border-b">YourApp</div>
            <div className="pt-4">{navLinks}</div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
