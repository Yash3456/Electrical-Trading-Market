
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useBlockchain } from "@/hooks/useBlockchain";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import { useAppSelector } from "@/hooks/useAppRedux";

interface CreateEnergyListingFormProps {
  useBlockchain?: boolean;
}

const CreateEnergyListingForm = ({ useBlockchain = false }: CreateEnergyListingFormProps) => {
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [source, setSource] = useState("solar");
  const [location, setLocation] = useState("");
  
  // Use Redux state and actions
  const { isConnected } = useAppSelector(state => state.blockchain);
  const { isLoading } = useAppSelector(state => state.listings);
  const { createListing } = useBlockchain();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!amount || !price || !source || !location) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if we should use blockchain and if wallet is connected
      if (useBlockchain && !isConnected) {
        toast({
          title: "Wallet not connected",
          description: "Please connect your wallet to use blockchain features",
          variant: "destructive",
        });
        return;
      }

      // Check if MetaMask is installed when using blockchain
      if (useBlockchain) {
        const ethereum = (window as any).ethereum;
        if (!ethereum) {
          toast({
            title: "MetaMask not installed",
            description: "Please install MetaMask to use blockchain features",
            variant: "destructive",
          });
          return;
        }
      }
      
      // Now proceed with creating the listing
      const result = await createListing(
        parseFloat(amount),
        parseFloat(price),
        source,
        location
      );
      
      if (result && result.success) {
        toast({
          title: "Energy listed successfully",
          description: `${amount} kWh of ${source} energy is now listed on the ${useBlockchain ? 'blockchain' : 'marketplace'}.`,
        });
        
        // Reset form
        setAmount("");
        setPrice("");
        setSource("solar");
        setLocation("");
      } else if (result && result.error) {
        toast({
          title: "Error creating listing",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error creating listing:", error);
      toast({
        title: "Error creating listing",
        description: error.message || "Something went wrong while creating your listing.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-5 w-5 text-energy-green mr-2" />
          List Your Energy {useBlockchain && "on Blockchain"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {useBlockchain && !isConnected && (
            <div className="p-4 mb-4 bg-muted rounded-lg">
              <p className="text-sm mb-3 text-center">Connect your wallet to list energy on the blockchain</p>
              <ConnectWalletButton className="w-full" />
            </div>
          )}
        
          <div className="space-y-2">
            <Label htmlFor="amount">Energy Amount (kWh)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter energy amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0.1"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (Tokens)</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price per kWh"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="0.1"
              step="0.1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Energy Source</Label>
            <Select 
              value={source} 
              onValueChange={setSource}
            >
              <SelectTrigger id="source">
                <SelectValue placeholder="Select energy source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solar">Solar</SelectItem>
                <SelectItem value="wind">Wind</SelectItem>
                <SelectItem value="hydro">Hydro</SelectItem>
                <SelectItem value="biomass">Biomass</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || (useBlockchain && !isConnected)}
          >
            {isLoading ? (
              <>
                <span className="mr-2">Processing</span>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                {useBlockchain ? "List on Blockchain" : "List Energy"}
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateEnergyListingForm;
