import { configureStore } from '@reduxjs/toolkit';
import siteSlice from './siteSlice';

const store = configureStore({
  reducer: {
    siteSlice,
  },
});

export default store;
