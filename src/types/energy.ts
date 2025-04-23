
export interface EnergyListing {
  id: string;
  seller: string;
  energyAmount: number; // in kWh
  price: number; // in tokens
  source: 'solar' | 'wind' | 'hydro' | 'biomass';
  location: string;
  timestamp: number;
  available: boolean;
}

export interface Transaction {
  id: string;
  seller: string;
  buyer: string;
  energyAmount: number;
  price: number;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
}

export interface UserWallet {
  address: string;
  balance: number;
  energyBalance: number;
}

export interface MarketStats {
  totalEnergy: number;
  averagePrice: number;
  totalTransactions: number;
  activeListings: number;
}

// Blockchain integration types
export interface BlockchainConfig {
  networkId: number;
  networkName: string;
  currencySymbol: string;
  contractAddresses: {
    energyToken: string;
    energyMarketplace: string;
  };
  rpcUrl: string;
  blockExplorerUrl: string;
}

export interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, callback: (...args: any[]) => void) => void;
  removeListener: (event: string, callback: (...args: any[]) => void) => void;
  selectedAddress: string | null;
  isConnected: () => boolean;
  chainId: string;
}

export type ContractTransaction = {
  hash: string;
  wait: () => Promise<ContractReceipt>;
};

export type ContractReceipt = {
  status: number;
  transactionHash: string;
  blockNumber: number;
  events?: any[];
};

