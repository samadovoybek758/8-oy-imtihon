import { configureStore } from '@reduxjs/toolkit';
import watchListReducer from './watchList';

// Redux store-ni yaratish
export const store = configureStore({
  reducer: {
    List : watchListReducer
  },
});
