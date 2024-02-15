import { configureStore } from '@reduxjs/toolkit'
import favoritesSlice from './favoritesSlice'
export const store = configureStore({
  reducer: {
    favoritesSlice
  },
})