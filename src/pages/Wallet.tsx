import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WalletCard from "@/components/WalletCard";
import TransactionsTable from "@/components/TransactionsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/hooks/useAppRedux";
import { UserWallet } from "@/types/energy";

const Wallet = () => {
  // Get wallet data from Redux
  const { walletAddress, tokenBalance, ethBalance, isConnected } =
    useAppSelector((state) => state.blockchain);
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );

  // Create a wallet object using Redux data or fallback to mock data
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

  const handleSendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Transaction submitted",
      description: "Your tokens are being transferred",
    });
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">My Wallet</h1>
        <p className="text-muted-foreground">
          Manage your tokens and energy balance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <WalletCard wallet={wallet} />
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="transactions">
            <TabsList>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="send">Send Tokens</TabsTrigger>
              <TabsTrigger value="receive">Receive Tokens</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <TransactionsTable
                    transactions={transactions}
                    userAddress={wallet.address}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="send">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ArrowUpRight className="h-5 w-5 mr-2 text-energy-blue" />
                    Send Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSendSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient Address</Label>
                      <Input id="recipient" placeholder="0x..." required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <div className="flex">
                        <Input
                          id="amount"
                          type="number"
                          placeholder="0.00"
                          step="0.01"
                          min="0.01"
                          className="rounded-r-none"
                          required
                        />
                        <div className="flex items-center justify-center min-w-[80px] h-10 rounded-r-md border border-l-0 bg-muted px-3">
                          Tokens
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Input
                        id="notes"
                        placeholder="What's this payment for?"
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Send Tokens
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="receive">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ArrowDownLeft className="h-5 w-5 mr-2 text-energy-green" />
                    Receive Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm mb-2">Your wallet address:</p>
                    <div className="flex items-center bg-muted p-3 rounded-md">
                      <code className="text-sm font-mono break-all">
                        {wallet.address}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-6 w-6 p-0 shrink-0"
                        onClick={() => {
                          navigator.clipboard.writeText(wallet.address);
                          toast({
                            title: "Address copied",
                            description: "Wallet address copied to clipboard",
                          });
                        }}
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
                          <rect
                            x="9"
                            y="9"
                            width="13"
                            height="13"
                            rx="2"
                            ry="2"
                          />
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                        <span className="sr-only">Copy address</span>
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-center p-6 border rounded-lg">
                    <div className="mx-auto h-48 w-48 bg-white p-2 rounded-lg mb-4">
                      {/* This would be a QR code in a real app */}
                      <div className="h-full w-full border-2 border-dashed border-energy-blue flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">
                          QR Code
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Share this address to receive tokens from other users
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
