import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MarketStatsCard from "@/components/MarketStatsCard";
import WalletCard from "@/components/WalletCard";
import TransactionsTable from "@/components/TransactionsTable";
import BlockchainVisualizer from "@/components/BlockchainVisualizer";
import EnergySourceChart from "@/components/EnergySourceChart";
import {
  mockMarketStats,
  mockWallets,
  mockTransactions,
} from "@/data/mockData";

const Dashboard = () => {
  const userWallet = mockWallets[0];

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your energy trades and track blockchain activity
        </p>
      </div>

      <MarketStatsCard stats={mockMarketStats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="activity">
            <TabsList className="mb-4">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <TransactionsTable
                    transactions={mockTransactions}
                    userAddress={userWallet.address}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blockchain">
              <BlockchainVisualizer />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
