import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from '../Card';
import Pagination from '../Pagination';
import Skeleton from '../Skeleton';

function MovieList({}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState('');
  const { type } = useParams();
  const headerRef = useRef(null);

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    getMovies();
  }, [type, currentPage]);

  ('https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&l&query=potter');

  const getMovies = async () => {
    setIsLoaded(false);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${
        type ? type : 'popular'
      }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${
        currentPage ? currentPage : '1'
      }`,
    );

    setMovieList(data.results);

    setTotalPages(data.total_pages);
    setIsLoaded(true);
  };

  const searchMovies = async () => {
    setIsLoaded(false);
    const { data } = await axios.get(
      ` https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&l${
        search !== '' ? `&query=${search}` : ''
      }`,
    );

    setMovieList(data.results);

    setTotalPages(data.total_pages);
    setIsLoaded(true);
  };

  return (
    <>
      <div className="max-w-[1300px] mx-auto mt-10">
        <h1 ref={headerRef} className="text-center md:text-left font-extrabold text-xl md:ml-24 ">
          {(type ? type : 'Popular').toUpperCase()}
        </h1>
        <div className="mt-7 px-3 flex items-center flex-wrap justify-center gap-6">
          {isLoaded
            ? movieList && movieList.map((movie) => <Card key={movie.id} {...movie} />)
            : [...Array(10)].map((_, id) => <Skeleton key={id} />)}
        </div>
      </div>

      <Pagination setCurrentPage={setCurrentPage} totalPages={totalPages} headerRef={headerRef} />
    </>
  );
}

export default MovieList;
