import {
  EnergyListing,
  Transaction,
  UserWallet,
  MarketStats,
} from "@/types/energy";

// Mock user wallets
export const mockWallets: UserWallet[] = [
  {
    address: "0x1a2b3c4d5e6f7g8h9i0j",
    balance: 500,
    energyBalance: 25,
  },
  {
    address: "0x9i8h7g6f5e4d3c2b1a0j",
    balance: 750,
    energyBalance: 15,
  },
];

// Mock energy listings
export const mockListings: EnergyListing[] = [
  {
    id: "1",
    seller: "0x2a3b4c5d6e7f8g9h0i1j",
    energyAmount: 10,
    price: 50,
    source: "solar",
    location: "Lucknow, Uttar Pradesh",
    timestamp: Date.now() - 3600000,
    available: true,
  },
  {
    id: "2",
    seller: "0x3a4b5c6d7e8f9g0h1i2j",
    energyAmount: 5,
    price: 30,
    source: "wind",
    location: "Jaipur,Rajasthan",
    timestamp: Date.now() - 7200000,
    available: true,
  },
  {
    id: "3",
    seller: "0x4a5b6c7d8e9f0g1h2i3j",
    energyAmount: 15,
    price: 70,
    source: "hydro",
    location: "Nagpur,Maharashtra",
    timestamp: Date.now() - 10800000,
    available: true,
  },
  {
    id: "4",
    seller: "0x5a6b7c8d9e0f1g2h3i4j",
    energyAmount: 8,
    price: 40,
    source: "biomass",
    location: "Bengaluru, Karnataka",
    timestamp: Date.now() - 14400000,
    available: true,
  },
  {
    id: "5",
    seller: "0x6a7b8c9d0e1f2g3h4i5j",
    energyAmount: 20,
    price: 90,
    source: "solar",
    location: "Kolapur,Maharashtra",
    timestamp: Date.now() - 18000000,
    available: true,
  },
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    seller: "0x7a8b9c0d1e2f3g4h5i6j",
    buyer: "0x1a2b3c4d5e6f7g8h9i0j",
    energyAmount: 12,
    price: 12,
    timestamp: Date.now() - 86400000,
    status: "completed",
  },
  {
    id: "t2",
    seller: "0x1a2b3c4d5e6f7g8h9i0j",
    buyer: "0x8a9b0c1d2e3f4g5h6i7j",
    energyAmount: 8,
    price: 8,
    timestamp: Date.now() - 172800000,
    status: "completed",
  },
  {
    id: "t3",
    seller: "0x9a0b1c2d3e4f5g6h7i8j",
    buyer: "0x1a2b3c4d5e6f7g8h9i0j",
    energyAmount: 5,
    price: 5,
    timestamp: Date.now() - 43200000,
    status: "pending",
  },
];

// Mock market stats
export const mockMarketStats: MarketStats = {
  totalEnergy: 58,
  averagePrice: 1,
  totalTransactions: 27,
  activeListings: 5,
};
