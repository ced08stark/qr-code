"use client"; // Assure-toi que ce composant est un Client Component

import React, { useState } from "react";
import Link from "next/link";
import { Home, ShoppingCart, Users, LineChart, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function SidebarMobile({
  activePage,
  setActivePage,
}: {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const links = [
    { name: "Dashboard", icon: <Home className="h-5 w-5" /> },
    { name: "Orders", icon: <ShoppingCart className="h-5 w-5" />, badge: 6 },
    { name: "Products", icon: <Package className="h-5 w-5" /> },
    { name: "Customers", icon: <Users className="h-5 w-5" /> },
    { name: "Analytics", icon: <LineChart className="h-5 w-5" /> },
  ];

  return (
    <nav className="grid gap-2 text-lg font-medium">
      {links.map((link) => (
        <Link
          key={link.name}
          href={`/${link.name.toLowerCase()}`}
          onClick={() => setActivePage(link.name)}
          className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
            activePage === link.name
              ? "bg-muted text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          {link.icon}
          {link.name}
          {link.badge && (
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {link.badge}
            </Badge>
          )}
        </Link>
      ))}
    </nav>
  );
}
