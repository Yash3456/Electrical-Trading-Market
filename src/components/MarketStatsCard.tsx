
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Zap, DollarSign, BarChart2, ShoppingCart } from "lucide-react";
import { MarketStats } from "@/types/energy";

const MarketStatsCard = ({ stats }: { stats: MarketStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Energy</CardTitle>
          <Zap className="h-4 w-4 text-energy-green" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalEnergy} kWh</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            <ArrowUpRight className="h-3 w-3 mr-1 text-energy-green" />
            <span className="text-energy-green">+2.5%</span> from last week
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Average Price</CardTitle>
          <DollarSign className="h-4 w-4 text-energy-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averagePrice} tokens/kWh</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            <ArrowUpRight className="h-3 w-3 mr-1 text-energy-red rotate-90" />
            <span className="text-energy-red">-0.8%</span> from last week
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Transactions</CardTitle>
          <BarChart2 className="h-4 w-4 text-energy-yellow" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalTransactions}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            <ArrowUpRight className="h-3 w-3 mr-1 text-energy-green" />
            <span className="text-energy-green">+12%</span> from last week
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
          <ShoppingCart className="h-4 w-4 text-energy-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeListings}</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            <ArrowUpRight className="h-3 w-3 mr-1 text-energy-green" />
            <span className="text-energy-green">+3.2%</span> from last week
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketStatsCard;
