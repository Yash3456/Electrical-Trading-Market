import React from "react";
import { Zap, User, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavigationItems from "./NavigationItems";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-6 flex items-center gap-2">
                <Zap size={24} className="text-energy-green" />
                <span className="font-bold text-xl">EnergyChain</span>
              </div>
              <div className="px-2">
                <NavigationItems mobile />
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <Zap size={24} className="text-energy-green" />
            <span className="font-bold text-xl hidden md:inline-flex">
              EnergyChain
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <NavigationItems />
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-gradient-energy text-white">
              EC
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
