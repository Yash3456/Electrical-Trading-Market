import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import blockchainService from "@/services/blockchainService";
import { EnergyListing } from "@/types/energy";
import { mockListings } from "@/data/mockData";

interface ListingsState {
  listings: EnergyListing[];
  userListings: EnergyListing[];
  isLoading: boolean;
  error: string | null;
  selectedListing: EnergyListing | null;
  isUsingBlockchain: boolean;
}

const initialState: ListingsState = {
  listings: [],
  userListings: [],
  isLoading: false,
  error: null,
  selectedListing: null,
  isUsingBlockchain: false,
};

export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async (useBlockchain: boolean, { rejectWithValue }) => {
    try {
      if (useBlockchain) {
        const listings = await blockchainService.getAllListings();
        return listings.length > 0 ? listings : mockListings;
      } else {
        return mockListings;
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch listings");
    }
  }
);

export const createListing = createAsyncThunk(
  "listings/createListing",
  async (
    {
      energyAmount,
      price,
      source,
      location,
      useBlockchain,
    }: {
      energyAmount: number;
      price: number;
      source: string;
      location: string;
      useBlockchain: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      if (useBlockchain) {
        const result = await blockchainService.createEnergyListing(
          energyAmount,
          price,
          source,
          location
        );

        if (!result.success) {
          return rejectWithValue(result.error || "Failed to create listing");
        }

        const newListing: EnergyListing = {
          id:
            result.transactionHash ||
            Math.random().toString(36).substring(2, 9),
          seller: (await blockchainService.connectWallet()) || "0x123...456",
          energyAmount,
          price,
          source: source as "solar" | "wind" | "hydro" | "biomass",
          location,
          timestamp: Date.now(),
          available: true,
        };

        return newListing;
      } else {
        // Mock listing creation
        const newListing: EnergyListing = {
          id: Math.random().toString(36).substring(2, 9),
          seller: "0x123...456",
          energyAmount,
          price,
          source: source as "solar" | "wind" | "hydro" | "biomass",
          location,
          timestamp: Date.now(),
          available: true,
        };

        return newListing;
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create listing");
    }
  }
);

export const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setSelectedListing: (
      state,
      action: PayloadAction<EnergyListing | null>
    ) => {
      state.selectedListing = action.payload;
    },
    setIsUsingBlockchain: (state, action: PayloadAction<boolean>) => {
      state.isUsingBlockchain = action.payload;
    },
    updateListingAvailability: (
      state,
      action: PayloadAction<{ id: string; available: boolean }>
    ) => {
      const { id, available } = action.payload;
      const index = state.listings.findIndex((listing) => listing.id === id);
      if (index !== -1) {
        state.listings[index].available = available;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listings = action.payload;
        // Filter for user listings if we have wallet address
        if (state.isUsingBlockchain) {
          // Would normally filter by user address here
        }
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createListing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listings.unshift(action.payload);
        state.userListings.unshift(action.payload);
      })
      .addCase(createListing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedListing,
  setIsUsingBlockchain,
  updateListingAvailability,
} = listingsSlice.actions;

export default listingsSlice.reducer;
