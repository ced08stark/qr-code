"use client"; // Assure-toi que ce composant est un Client Component

import React, { useState } from "react";
import Link from "next/link";
import { Home, ShoppingCart, Users, LineChart, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Sidebar({
  activePage,
  setActivePage,
}: {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const links = [
    { name: "Dashboard", icon: <Home className="h-4 w-4" /> },
    { name: "Orders", icon: <ShoppingCart className="h-4 w-4" />, badge: 6 },
    { name: "Products", icon: <Package className="h-4 w-4" /> },
    { name: "Customers", icon: <Users className="h-4 w-4" /> },
    { name: "Analytics", icon: <LineChart className="h-4 w-4" /> },
  ];

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {links.map((link) => (
        <Link
          key={link.name}
          href={`/${link.name.toLowerCase()}`}
          onClick={() => setActivePage(link.name)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
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
