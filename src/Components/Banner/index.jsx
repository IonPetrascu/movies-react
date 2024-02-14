import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
const Banner = () => {
  const [movies, setMovies] = useState([]);
  const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`,
    );
    setMovies(data.results);
  };


  return (
    <>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={false}
      >
        {movies.map((movie) => {
          return (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="relative h-[600px] ">
                <div className="absolute top-0 left-0 w-full h-full z-[1] bg-gradient-to-t from-black bg-black/50 "></div>
                <div className="absolute top-0 left-0 w-full h-full ">
                  <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                  />
                </div>
                <div className="left-10 bottom-40  w-2/3 md:w-auto absolute md:left-40 md:bottom-40  text-start z-[2]">
                  <h2 className="font-semibold text-5xl md:text-7xl mb-4 md:font-bold">
                    {movie.title}
                  </h2>
                  <span className="text-2xl mr-5 font-semibold">{movie.release_date}</span>
                  <span className="text-2xl inline-flex items-center gap-2 font-semibold">
                    {movie.vote_average.toFixed(1)}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  </span>
                  <p className="mt-1 text-xl max-w-[600px]">
                    {movie.overview.slice(0, 140) + '...'}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </>
  );
};

export default Banner;
