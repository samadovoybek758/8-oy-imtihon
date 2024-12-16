import { configureStore } from '@reduxjs/toolkit';
import watchListReducer from './watchList';

export const store = configureStore({
  reducer: {
    List : watchListReducer
  },
});
