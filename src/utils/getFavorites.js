export const getFavorites = () => {
  const data = localStorage.getItem('favorites');
  const favoritesMovies = data ? JSON.parse(data) : [];
  console.log(favoritesMovies);
  return favoritesMovies;
};
