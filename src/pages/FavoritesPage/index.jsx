import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Card from '../../Components/Card';
import { Link } from 'react-router-dom';
import TopCast from '../../Components/topCast';

const FavoritesPage = () => {
  const { movies, actors } = useSelector((state) => state.favoritesSlice);

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted) {
      const json = JSON.stringify(movies);
      localStorage.setItem('favorites', json);
    }
    isMounted.current = true;
  }, [movies]);

  if (movies.length === 0 && actors.length === 0) {
    return (
      <div className="w-full flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-40 h-40"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
          />
        </svg>
        <h2 className="text-3xl ">You haven't added anything to favorites</h2>
        <Link to="/">
          <button className="ml-5 px-3 py-2 border rounded-full hover:scale-110 transition-all ease-in-out text-lg ">
            Back
          </button>
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-[1300px] mx-auto mt-10 flex flex-col gap-7">
      {movies.length > 0 && (
        <div>
          <h1 className="text-center md:text-left font-extrabold text-xl md:ml-24 ">
            FAVORITES MOVIES
          </h1>

          <div className="mt-7 px-3 flex items-center flex-wrap justify-start gap-6">
            {movies &&
              movies.length > 0 &&
              movies.map((movie) => <Card key={movie.id} {...movie} />)}
          </div>
        </div>
      )}
      {actors.length > 0 && (
        <div>
          <h1 className="text-center md:text-left font-extrabold text-xl md:ml-24 ">
            FAVORITES ACTORS
          </h1>
          <div>
            <TopCast actors={actors} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
