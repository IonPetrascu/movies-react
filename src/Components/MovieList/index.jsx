import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from '../Card';
import Skeleton from '../Skeleton';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

function MovieList({}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { type } = useParams();
  const headerRef = useRef(null);

  const { movies } = useSelector((state) => state.favoritesSlice);
  const isMounted = useRef(false);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  useEffect(() => {
    if (inView) {
      getMoreMovies();
    }
  }, [inView]);

  useEffect(() => {
    if (isMounted) {
      const json = JSON.stringify(movies);
      localStorage.setItem('favorites', json);
    }
    isMounted.current = true;
  }, [movies]);

  useEffect(() => {
    getMovies();
  }, [type]);

  const getMovies = async () => {
    setIsLoaded(false);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${
        type ? type : 'popular'
      }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${
        currentPage ? currentPage : 1
      }`,
    );

    setMovieList(data.results);
    setIsLoaded(true);
  };

  const getMoreMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${
        type ? type : 'popular'
      }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${
        currentPage + 1
      }`,
    );
    setMovieList((prev) => [...prev, ...data.results]);
    setCurrentPage((prev) => prev + 1);
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
      <div ref={ref} className="flex justify-center py-10"></div>
    </>
  );
}

export default MovieList;
