
import React from "react";
import { Link } from "react-router-dom";
import { Home, BarChart2, ShoppingCart, Wallet, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface NavigationItemsProps {
  mobile?: boolean;
}

const NavigationItems = ({ mobile = false }: NavigationItemsProps) => {
  const navItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingCart },
    { name: "Wallet", href: "/wallet", icon: Wallet },
    { name: "My Energy", href: "/my-energy", icon: Zap },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
  ];

  if (mobile) {
    return (
      <nav className="grid gap-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start px-2"
            )}
          >
            <item.icon className="mr-2 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden lg:flex items-center space-x-4">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "flex items-center gap-2"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationItems;
