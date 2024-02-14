import React from 'react';
import { Link } from 'react-router-dom';
function Card({ id, overview, poster_path, release_date, vote_average, title }) {
  return (
    <>
      <Link className="group" to={`/movie/${id}`}>
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
      </Link>
    </>
  );
}

export default Card;
