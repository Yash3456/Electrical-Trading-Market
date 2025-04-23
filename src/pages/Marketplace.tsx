import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Zap,
  CheckCircle,
  AlertCircle,
  ShoppingCart,
} from "lucide-react";
import EnergyListingCard from "@/components/EnergyListingCard";
import CreateEnergyListingForm from "@/components/CreateEnergyListingForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EnergyListing } from "@/types/energy";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import { useBlockchain } from "@/hooks/useBlockchain";
import { useAppSelector, useAppDispatch } from "@/hooks/useAppRedux";
import {
  fetchListings,
  setSelectedListing,
  updateListingAvailability,
} from "@/store/listingsSlice";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [purchaseState, setPurchaseState] = useState<
    "idle" | "confirming" | "processing" | "success" | "error"
  >("idle");
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const dispatch = useAppDispatch();

  // Redux state
  const { isConnected } = useAppSelector((state) => state.blockchain);
  const { listings, selectedListing, isUsingBlockchain } = useAppSelector(
    (state) => state.listings
  );
  const { isLoading: transactionLoading } = useAppSelector(
    (state) => state.transactions
  );

  const { purchaseEnergy, getListings, toggleBlockchainMode } = useBlockchain();

  useEffect(() => {
    dispatch(fetchListings(isUsingBlockchain));
  }, [dispatch, isUsingBlockchain]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search Results",
      description: `Found ${filteredListings.length} listings matching "${searchQuery}"`,
    });
  };

  const handleBuy = (listing: EnergyListing) => {
    dispatch(setSelectedListing(listing));
    setPurchaseState("idle");
    setDialogOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedListing) return;

    setPurchaseState("processing");

    try {
      const result = await purchaseEnergy(selectedListing.id);

      if (result.success) {
        // Mark listing as unavailable
        dispatch(
          updateListingAvailability({
            id: selectedListing.id,
            available: false,
          })
        );

        setPurchaseState("success");
        setTimeout(() => {
          setDialogOpen(false);
          toast({
            title: "Purchase Successful",
            description: `You purchased ${selectedListing.energyAmount} kWh of energy for ${selectedListing.price} tokens`,
          });
          setPurchaseState("idle");
          // Refresh listings
          dispatch(fetchListings(isUsingBlockchain));
        }, 2000);
      } else {
        setPurchaseState("error");
        setAlertDialogOpen(true);
      }
    } catch (error) {
      console.error("Error purchasing energy:", error);
      setPurchaseState("error");
      setAlertDialogOpen(true);
    }
  };

  const handleRetryPurchase = () => {
    setAlertDialogOpen(false);
    setPurchaseState("idle");
  };

  const filteredListings = listings
    .filter((listing) => {
      if (
        sourceFilter &&
        sourceFilter !== "all" &&
        listing.source !== sourceFilter
      )
        return false;
      if (
        searchQuery &&
        !listing.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return listing.available;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "amount-high":
          return b.energyAmount - a.energyAmount;
        case "newest":
        default:
          return b.timestamp - a.timestamp;
      }
    });

  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Energy Marketplace</h1>
          <div className="flex gap-2">
            <ConnectWalletButton />
            {isConnected && (
              <Button
                variant={isUsingBlockchain ? "default" : "outline"}
                onClick={toggleBlockchainMode}
              >
                {isUsingBlockchain ? "Demo Mode" : "Real Blockchain"}
              </Button>
            )}
          </div>
        </div>
        <p className="text-muted-foreground">
          Buy and sell renewable energy on the blockchain
        </p>
      </div>

      <Tabs defaultValue="browse">
        <TabsContent value="browse" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by location..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </form>

            <div className="flex gap-2">
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="min-w-[140px] w-fit">
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="whitespace-nowrap">
                    {sourceFilter === "all" ? "All Sources" : sourceFilter}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="solar">Solar</SelectItem>
                  <SelectItem value="wind">Wind</SelectItem>
                  <SelectItem value="hydro">Hydro</SelectItem>
                  <SelectItem value="biomass">Biomass</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="min-w-[140px] w-fit">
                  <span className="whitespace-nowrap">
                    Sort: {sortOption.replace("-", " ")}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="amount-high">
                    Amount: High to Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <EnergyListingCard
                  key={listing.id}
                  listing={listing}
                  onBuy={handleBuy}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Zap className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No listings found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sell">
          <div className="max-w-md mx-auto">
            <CreateEnergyListingForm useBlockchain={isUsingBlockchain} />
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {purchaseState === "success"
                ? "Purchase Successful"
                : purchaseState === "processing"
                ? "Processing Transaction"
                : "Confirm Purchase"}
            </DialogTitle>
          </DialogHeader>

          {purchaseState === "processing" && (
            <div className="py-6 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-center">
                {isUsingBlockchain
                  ? "Processing your transaction on the blockchain..."
                  : "Processing your transaction..."}
                <br />
                <span className="text-sm text-muted-foreground">
                  Please wait, this may take a moment
                </span>
              </p>
            </div>
          )}

          {purchaseState === "success" && (
            <div className="py-6 flex flex-col items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <p className="text-center">
                {isUsingBlockchain
                  ? "Transaction confirmed on the blockchain!"
                  : "Transaction completed!"}
                <br />
                <span className="text-sm text-muted-foreground">
                  Energy tokens will be added to your wallet
                </span>
              </p>
            </div>
          )}

          {purchaseState === "idle" && selectedListing && (
            <>
              <div className="py-4">
                <p>Are you sure you want to purchase this energy?</p>

                <div className="mt-4 p-4 border rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">
                      Energy Source:
                    </span>
                    <span className="font-medium capitalize">
                      {selectedListing.source}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">
                      {selectedListing.energyAmount} kWh
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-medium">
                      {selectedListing.price} Tokens
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seller:</span>
                    <span className="font-medium font-mono text-xs">
                      {selectedListing.seller.substring(0, 14)}...
                    </span>
                  </div>
                </div>

                {isUsingBlockchain && !isConnected && (
                  <div className="mt-4">
                    <ConnectWalletButton className="w-full mb-2" />
                    <p className="text-xs text-muted-foreground text-center">
                      You need to connect your wallet to make blockchain
                      purchases
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmPurchase}
                  className="flex items-center gap-2"
                  disabled={
                    (isUsingBlockchain && !isConnected) || transactionLoading
                  }
                >
                  <ShoppingCart className="h-4 w-4" />
                  Confirm Purchase
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Transaction Failed</AlertDialogTitle>
            <AlertDialogDescription>
              {isUsingBlockchain
                ? "There was an error processing your transaction on the blockchain. This could be due to network congestion, contract errors, or insufficient funds in your wallet."
                : "There was an error processing your transaction. This could be due to network congestion or insufficient funds in your wallet."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleRetryPurchase}>
              Try Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Marketplace;
