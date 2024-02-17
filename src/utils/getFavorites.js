export const getFavorites = () => {
  const data = localStorage.getItem('favorites');
  const actors = localStorage.getItem('actors');

  const favoritesMovies = data ? JSON.parse(data) : [];
  const favoritesActors = actors ? JSON.parse(actors) : [];

  return{ favoritesActors, favoritesMovies };
};
