"use client";
import * as React from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { siteConfig } from "@/config";
import { type NavItem } from "@//types";

export default function MobileNav({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            {/* <Icons.logo className="mr-2 h-4 w-4" aria-hidden="true" /> */}
            <span className="font-bold">{siteConfig.title}</span>
            <span className="sr-only">Home</span>
          </Link>
        </div>
        <nav className="mt-6">
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="flex items-center px-7 py-2 rounded-md hover:bg-muted hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
