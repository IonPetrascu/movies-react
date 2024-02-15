import { createSlice } from '@reduxjs/toolkit';
import { getFavorites } from '../utils/getFavorites';

const movies = getFavorites();
const initialState = {
  movies: movies,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const include = state.movies.find((obj) => obj.id === action.payload.id);
  
      if (include) {
        state.movies = state.movies.filter((el) => el.id !== action.payload.id);
      } else {
        state.movies.push(action.payload);
      }
    },
  },
});

export const { addToFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
