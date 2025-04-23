import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserWallet } from "@/types/energy";
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, Zap } from "lucide-react";
import EnergySourceChart from "./EnergySourceChart";

interface WalletCardProps {
  wallet: UserWallet;
}

const WalletCard = ({ wallet }: WalletCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>My Wallet</span>
          <Wallet className="h-5 w-5 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Wallet Address
          </p>
          <div className="flex items-center bg-muted p-2 rounded-md">
            <code className="text-xs font-mono truncate">{wallet.address}</code>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto h-6 w-6 p-0"
              onClick={() => navigator.clipboard.writeText(wallet.address)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              <span className="sr-only">Copy address</span>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gradient-energy rounded-lg text-white">
            <p className="text-xs font-medium opacity-80 mb-1">
              Available Balance
            </p>
            <h3 className="text-2xl font-bold">{wallet.balance} Tokens</h3>
          </div>

          <div className="p-4 bg-muted rounded-lg flex items-center">
            <div className="mr-auto">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Energy Balance
              </p>
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-1 text-energy-green" />
                <span className="text-lg font-bold">
                  {wallet.energyBalance} kWh
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button className="flex-1" variant="outline">
            <ArrowDownLeft className="h-4 w-4 mr-2" /> Receive
          </Button>
          <Button className="flex-1" variant="outline">
            <ArrowUpRight className="h-4 w-4 mr-2" /> Send
          </Button>
        </div>

        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Funds
        </Button>
        <EnergySourceChart />
      </CardContent>
    </Card>
  );
};

export default WalletCard;
