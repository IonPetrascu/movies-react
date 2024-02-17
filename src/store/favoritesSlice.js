import { createSlice } from '@reduxjs/toolkit';
import { getFavorites } from '../utils/getFavorites';

const { favoritesActors, favoritesMovies } = getFavorites();

const initialState = {
  movies: favoritesMovies,
  actors: favoritesActors,
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
    addActorToFavorites: (state, action) => {
      const include = state.actors.find((obj) => obj.id === action.payload.id);
      
      if (include) {
        state.actors = state.actors.filter((el) => el.id !== action.payload.id);
      } else {
        state.actors.push(action.payload);
      }
    },
  },
});

export const { addToFavorites ,addActorToFavorites} = favoritesSlice.actions;

export default favoritesSlice.reducer;
