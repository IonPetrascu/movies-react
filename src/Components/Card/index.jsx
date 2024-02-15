import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites } from '../../store/favoritesSlice';
import { toast } from 'react-hot-toast';

function Card({ id, overview, poster_path, release_date, vote_average, title }) {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState(false);
  const { movies } = useSelector((state) => state.favoritesSlice);

  useEffect(() => {
    movies.some((el) => {
      if (el.id === id) {
        setFavorites(true);
      }
    });
  }, []);
  const addMovieToFavorites = (e) => {
    e.preventDefault();
    favorites ? toast.success('The film has been successfully removed from favorites!') : toast.success('The film has been successfully added to favorites!')
    

    setFavorites(!favorites);
    const movie = {
      id,
      overview,
      poster_path,
      release_date,
      vote_average,
      title,
    };
    dispatch(addToFavorites(movie));
  };
  return (
    <>
      <Link className="group relative" to={`/movie/${id}`}>
        <div className="border rounded-md overflow-hidden hover:scale-110 transition-all ease-in-out relative w-[200px] h-[297px]  ">
          {poster_path ? (
            <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt="" />
          ) : (
            <img
              className="h-[296px] object-cover"
              src={
                'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg'
              }
              alt=""
            />
          )}
          <div className="absolute hidden group-hover:block bottom-2 left-2 z-[1]">
            <h3 className="mb-3 font-extrabold text-lg">{title && title}</h3>
            <div className="flex gap-4 items-center">
              <span>{release_date}</span>
              <span className="flex items-center gap-1 ">
                {vote_average && vote_average.toFixed(1)}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </span>
            </div>
            <p>{overview && overview.slice(0, 90) + '...'}</p>
          </div>
          <div className="hidden group-hover:block absolute bg-gradient-to-t from-black  top-0 left-0 w-full h-full"></div>
        </div>

        <div
          onClick={(e) => addMovieToFavorites(e)}
          className="absolute top-4 right-3 min-w-auto min-h-auto z-[100]"
        >
          {favorites ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          )}
        </div>
      </Link>
    </>
  );
}

export default Card;
