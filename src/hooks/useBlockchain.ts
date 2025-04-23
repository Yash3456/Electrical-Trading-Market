
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from './useAppRedux';
import { connectWallet, updateBalances, checkMetaMaskInstalled, clearBlockchainError } from '@/store/blockchainSlice';
import { fetchListings, createListing, setIsUsingBlockchain } from '@/store/listingsSlice';
import { purchaseEnergy } from '@/store/transactionsSlice';
import blockchainService from '@/services/blockchainService';

export function useBlockchain() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  const { 
    isConnected, 
    isLoading: blockchainLoading, 
    walletAddress,
    tokenBalance,
    ethBalance,
    error: blockchainError,
    isMetaMaskInstalled
  } = useAppSelector(state => state.blockchain);
  
  const { isUsingBlockchain } = useAppSelector(state => state.listings);

  useEffect(() => {
    // Check if MetaMask is installed
    dispatch(checkMetaMaskInstalled());
    
    // Check if the user has previously connected their wallet
    const checkConnection = async () => {
      const ethereum = (window as any).ethereum;
      if (ethereum && ethereum.selectedAddress) {
        handleConnectWallet();
      }
    };

    checkConnection();

    // Listen for account changes
    const ethereum = (window as any).ethereum;
    if (ethereum) {
      ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          dispatch(updateBalances({ tokenBalance: 0, ethBalance: 0 }));
          setIsUsingBlockchain(false);
        } else {
          // Account changed, refresh balances
          handleConnectWallet();
        }
      });

      ethereum.on('chainChanged', () => {
        // Chain changed, refresh connection
        window.location.reload();
      });
    }

    return () => {
      // Clean up listeners
      if (ethereum) {
        ethereum.removeListener('accountsChanged', () => {});
        ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  // Show blockchain errors as toasts
  useEffect(() => {
    if (blockchainError) {
      toast({
        title: "Blockchain Warning",
        description: blockchainError,
        variant: "destructive",
      });
      
      // Clear the error after showing it
      setTimeout(() => {
        dispatch(clearBlockchainError());
      }, 5000);
    }
  }, [blockchainError]);

  const handleConnectWallet = async () => {
    if (!isMetaMaskInstalled) {
      toast({
        title: "MetaMask not installed",
        description: "Please install MetaMask to use blockchain features",
        variant: "destructive",
      });
      return;
    }
    
    const resultAction = await dispatch(connectWallet());
    
    if (connectWallet.fulfilled.match(resultAction)) {
      const address = resultAction.payload.address;
      toast({
        title: "Wallet connected",
        description: `Connected to ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
      });
    } else if (connectWallet.rejected.match(resultAction) && resultAction.payload) {
      toast({
        title: "Connection failed",
        description: resultAction.payload as string,
        variant: "destructive",
      });
    }
  };

  const checkWalletRequirements = () => {
    if (!isMetaMaskInstalled) {
      toast({
        title: "MetaMask not installed",
        description: "Please install MetaMask to use blockchain features",
        variant: "destructive",
      });
      return false;
    }

    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to use blockchain features",
        variant: "destructive",
      });
      return false;
    }

    if (ethBalance < 0.001) {
      toast({
        title: "Insufficient ETH balance",
        description: "You need some ETH in your wallet to pay for gas fees",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleCreateListing = async (
    energyAmount: number,
    price: number,
    source: string,
    location: string
  ) => {
    // First check if we're in blockchain mode and wallet requirements are met
    if (isUsingBlockchain) {
      if (!checkWalletRequirements()) {
        return { success: false, error: "Wallet requirements not met" };
      }
    }

    const resultAction = await dispatch(
      createListing({
        energyAmount,
        price,
        source,
        location,
        useBlockchain: isUsingBlockchain
      })
    );

    if (createListing.fulfilled.match(resultAction)) {
      toast({
        title: "Listing created",
        description: "Your energy listing has been created successfully.",
      });
      return { success: true };
    } else if (createListing.rejected.match(resultAction) && resultAction.payload) {
      toast({
        title: "Failed to create listing",
        description: resultAction.payload as string,
        variant: "destructive",
      });
      return { success: false, error: resultAction.payload as string };
    }
    
    return { success: false, error: "Unknown error" };
  };

  const handlePurchaseEnergy = async (listingId: string) => {
    // First check if we're in blockchain mode and wallet requirements are met
    if (isUsingBlockchain) {
      if (!checkWalletRequirements()) {
        return { success: false, error: "Wallet requirements not met" };
      }
    }
    
    // Get listing details first
    const listing = await blockchainService.getListingById(listingId);
    
    if (!listing) {
      toast({
        title: "Listing not found",
        description: "The energy listing you're trying to purchase doesn't exist.",
        variant: "destructive",
      });
      return { success: false, error: "Listing not found" };
    }
    
    // Check if user has enough tokens
    if (isUsingBlockchain && tokenBalance < listing.price) {
      toast({
        title: "Insufficient token balance",
        description: `You need ${listing.price} tokens to make this purchase, but you only have ${tokenBalance}.`,
        variant: "destructive",
      });
      return { success: false, error: "Insufficient token balance" };
    }
    
    const resultAction = await dispatch(
      purchaseEnergy({
        listing,
        useBlockchain: isUsingBlockchain
      })
    );

    if (purchaseEnergy.fulfilled.match(resultAction)) {
      toast({
        title: "Purchase successful",
        description: `You purchased ${listing.energyAmount} kWh of energy for ${listing.price} tokens`,
      });
      
      // Update balances
      const { tokenBalance, ethBalance } = await blockchainService.getWalletBalance();
      dispatch(updateBalances({ tokenBalance, ethBalance }));
      
      return { success: true };
    } else if (purchaseEnergy.rejected.match(resultAction) && resultAction.payload) {
      toast({
        title: "Purchase failed",
        description: resultAction.payload as string,
        variant: "destructive",
      });
      return { success: false, error: resultAction.payload as string };
    }
    
    return { success: false, error: "Unknown error" };
  };

  const handleGetListings = async () => {
    const resultAction = await dispatch(fetchListings(isUsingBlockchain));
    
    if (fetchListings.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    
    return [];
  };
  
  const toggleBlockchainMode = async () => {
    // If we're turning on blockchain mode, make sure wallet is connected first
    if (!isUsingBlockchain) {
      // Check for MetaMask installation first
      if (!isMetaMaskInstalled) {
        toast({
          title: "MetaMask not installed",
          description: "Please install MetaMask to use blockchain features",
          variant: "destructive",
        });
        return;
      }
      
      if (!isConnected) {
        await handleConnectWallet();
        if (!isConnected) {
          // If still not connected after trying, abort
          return;
        }
      }
    }
    
    dispatch(setIsUsingBlockchain(!isUsingBlockchain));
    dispatch(fetchListings(!isUsingBlockchain));
    
    toast({
      title: !isUsingBlockchain ? "Using blockchain mode" : "Using demo mode",
      description: !isUsingBlockchain 
        ? "Connected to real blockchain data" 
        : "Switched to demo data",
    });
  };

  return {
    isConnected,
    isLoading: blockchainLoading,
    walletAddress,
    tokenBalance,
    ethBalance,
    isUsingBlockchain,
    isMetaMaskInstalled,
    error: blockchainError,
    connectWallet: handleConnectWallet,
    createListing: handleCreateListing,
    purchaseEnergy: handlePurchaseEnergy,
    getListings: handleGetListings,
    toggleBlockchainMode,
  };
}
