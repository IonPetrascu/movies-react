import Home from './pages/Home';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import MovieDetail from './Components/MovieDetail';
import MovieList from './Components/MovieList';
import ActorPage from './pages/ActorPage';
import FavoritesPage from './pages/FavoritesPage';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route path="movies/:type" element={<MovieList />} />
        <Route path="person/:id" element={<ActorPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/*" element={<h1>Error page</h1>} />
      </Routes>
    </>
  );
}

export default App;
