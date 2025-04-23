
import { configureStore } from '@reduxjs/toolkit';
import blockchainReducer from './blockchainSlice';
import listingsReducer from './listingsSlice';
import transactionsReducer from './transactionsSlice';

export const store = configureStore({
  reducer: {
    blockchain: blockchainReducer,
    listings: listingsReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
