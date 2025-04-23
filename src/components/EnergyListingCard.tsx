
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EnergyListing } from "@/types/energy";
import { Zap, MapPin, Clock, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const EnergySourceIcon = ({ source }: { source: EnergyListing['source'] }) => {
  const iconProps = { className: "h-4 w-4 mr-1" };
  
  // Simple icon mapping for energy sources
  switch (source) {
    case 'solar': 
      return <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>;
    case 'wind': 
      return <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" /></svg>;
    case 'hydro': 
      return <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v6m0 0a5 5 0 1 0 5 5M12 8a5 5 0 0 1 5 5m-5-5a5 5 0 0 0-5 5m5-5v10m0 0a5 5 0 0 0 5-5m-5 5a5 5 0 0 1-5-5" /></svg>;
    case 'biomass': 
      return <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" /><path d="M12 5.3a22.5 22.5 0 0 1 0 13.4" /><path d="M4.9 3c-.8 1.2-1.3 2.5-1.5 3.9a18 18 0 0 0 0 10.2c.2 1.4.7 2.7 1.5 3.9" /><path d="M19.1 3c.8 1.2 1.3 2.5 1.5 3.9a18 18 0 0 1 0 10.2c-.2 1.4-.7 2.7-1.5 3.9" /></svg>;
    default: 
      return <Zap {...iconProps} />;
  }
};

const sourceColors = {
  solar: 'bg-yellow-100 text-yellow-800',
  wind: 'bg-blue-100 text-blue-800',
  hydro: 'bg-cyan-100 text-cyan-800',
  biomass: 'bg-green-100 text-green-800'
};

interface EnergyListingCardProps {
  listing: EnergyListing;
  onBuy?: (listing: EnergyListing) => void;
}

const EnergyListingCard = ({ listing, onBuy }: EnergyListingCardProps) => {
  const handleBuy = () => {
    if (onBuy) {
      onBuy(listing);
    } else {
      toast({
        title: "Purchase initiated",
        description: `Buying ${listing.energyAmount} kWh for ${listing.price} tokens`,
      });
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <Badge className={sourceColors[listing.source]}>
            <EnergySourceIcon source={listing.source} />
            {listing.source.charAt(0).toUpperCase() + listing.source.slice(1)}
          </Badge>
          <div className="font-bold text-xl">{listing.price} Tokens</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Zap className="h-4 w-4 mr-2 text-energy-green" />
            <span className="font-medium">{listing.energyAmount} kWh</span>
          </div>
          
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">{listing.location}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <User className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground truncate">Seller: {listing.seller.substr(0, 10)}...</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">
              Listed {new Date(listing.timestamp).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full" onClick={handleBuy}>
          Buy Energy
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EnergyListingCard;
