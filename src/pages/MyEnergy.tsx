import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import CreateEnergyListingForm from "@/components/CreateEnergyListingForm";
import { mockListings, mockWallets } from "@/data/mockData";
import { EnergyListing } from "@/types/energy";
import {
  Zap,
  BatteryMedium,
  Clock,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EnergyListingCard from "@/components/EnergyListingCard";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/hooks/useAppRedux";
import { UserWallet } from "@/types/energy";

const MyEnergy = () => {
  const myListings = mockListings.slice(0, 2); // Mock user listings

  const { walletAddress, tokenBalance, ethBalance, isConnected } =
    useAppSelector((state) => state.blockchain);
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );

  const wallet: UserWallet = isConnected
    ? {
        address: walletAddress || "0x0000000000000000000000000000000000000000",
        balance: tokenBalance,
        energyBalance: 0, // Would be set from blockchain data in a real app
      }
    : {
        address: "0x1234567890abcdef1234567890abcdef12345678",
        balance: 1000,
        energyBalance: 50,
      };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">My Energy</h1>
        <p className="text-muted-foreground">
          Manage your energy production and consumption
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Zap className="h-4 w-4 mr-2 text-energy-green" />
              <div className="text-2xl font-bold">
                {wallet.energyBalance} kWh
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Daily Production
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BatteryMedium className="h-4 w-4 mr-2 text-energy-blue" />
              <div className="text-2xl font-bold">12.5 kWh</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Listings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ShoppingCart className="h-4 w-4 mr-2 text-energy-yellow" />
              <div className="text-2xl font-bold">{myListings.length}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Energy Storage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>75% Full</span>
                <span>15 kWh / 20 kWh</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="monitor">
        <TabsList>
          <TabsTrigger value="monitor">Energy Monitor</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
        </TabsList>

        <TabsContent value="monitor">
          <Card>
            <CardHeader>
              <CardTitle>Energy Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-6 rounded-lg blockchain-grid">
                <div className="flex flex-col items-center justify-center">
                  <div className="h-60 w-full rounded-lg border border-dashed border-muted-foreground flex items-center justify-center">
                    <div className="text-center">
                      <Zap className="h-10 w-10 mx-auto text-energy-green mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        Energy Flow Visualization
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        In a real application, this would display a real-time
                        visualization of energy production, consumption, and
                        transfers on the blockchain.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                          <Zap className="h-8 w-8 text-energy-green mb-2" />
                          <h3 className="font-medium">Production</h3>
                          <div className="mt-2 text-2xl font-bold">
                            45.2 kWh
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Today's total
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                          <BatteryMedium className="h-8 w-8 text-energy-blue mb-2" />
                          <h3 className="font-medium">Consumption</h3>
                          <div className="mt-2 text-2xl font-bold">
                            32.7 kWh
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Today's total
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center">
                          <Clock className="h-8 w-8 text-energy-yellow mb-2" />
                          <h3 className="font-medium">Peak Time</h3>
                          <div className="mt-2 text-2xl font-bold">2:00 PM</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Highest production
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listings">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">My Active Listings</h2>
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                Manage Settings
              </Button>
            </div>

            {myListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myListings.map((listing: EnergyListing) => (
                  <EnergyListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Zap className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No active listings</h3>
                <p className="text-muted-foreground mt-2 mb-6">
                  You don't have any energy listed on the marketplace
                </p>
                <Button>Create Your First Listing</Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="sell">
          <div className="max-w-md mx-auto">
            <CreateEnergyListingForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyEnergy;
