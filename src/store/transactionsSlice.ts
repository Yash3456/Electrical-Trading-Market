
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import blockchainService from '@/services/blockchainService';
import { EnergyListing, Transaction } from '@/types/energy';
import { mockTransactions } from '@/data/mockData';
import { RootState } from './index';

interface TransactionsState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: mockTransactions,
  isLoading: false,
  error: null,
};

export const purchaseEnergy = createAsyncThunk(
  'transactions/purchaseEnergy',
  async (
    { listing, useBlockchain }: { listing: EnergyListing; useBlockchain: boolean },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const buyerAddress = state.blockchain.walletAddress || '0xBuyer...';
      
      if (useBlockchain) {
        const result = await blockchainService.purchaseEnergyListing(listing.id);
        
        if (!result.success) {
          return rejectWithValue(result.error || 'Failed to purchase energy');
        }
        
        // Create transaction record
        const transaction: Transaction = {
          id: result.transactionHash || Math.random().toString(36).substring(2, 9),
          seller: listing.seller,
          buyer: buyerAddress,
          energyAmount: listing.energyAmount,
          price: listing.price,
          timestamp: Date.now(),
          status: 'completed',
        };
        
        return { transaction, listingId: listing.id };
      } else {
        // Mock transaction
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const transaction: Transaction = {
          id: Math.random().toString(36).substring(2, 9),
          seller: listing.seller,
          buyer: buyerAddress,
          energyAmount: listing.energyAmount,
          price: listing.price,
          timestamp: Date.now(),
          status: 'completed',
        };
        
        return { transaction, listingId: listing.id };
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to purchase energy');
    }
  }
);

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(purchaseEnergy.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(purchaseEnergy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.unshift(action.payload.transaction);
      })
      .addCase(purchaseEnergy.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
