import React from 'react';
import { Link } from 'react-router-dom';

function Nav({ display, handleClickMenu }) {
  return (
    <nav className={`${display ? 'hidden' : 'block'} md:block h-full`}>
      <ul className="flex md:flex-row flex-col  gap-8 md:font-bold  items-center h-full justify-center">
        <li onClick={handleClickMenu}>
          <Link to="/" className="hover:underline underline-offset-8 text-3xl md:text-xl">
            Home
          </Link>
        </li>
        <li onClick={handleClickMenu}>
          <Link
            to="movies/popular"
            className="hover:underline underline-offset-8 text-3xl md:text-xl"
          >
            Popular
          </Link>
        </li>
        <li onClick={handleClickMenu}>
          <Link
            to="movies/top_rated"
            className="hover:underline underline-offset-8 text-3xl md:text-xl"
          >
            Top Rated
          </Link>
        </li>
        <li onClick={handleClickMenu}>
          <Link
            to="movies/upcoming"
            className="hover:underline underline-offset-8 text-3xl md:text-xl"
          >
            Upcoming
          </Link>
        </li>
        <li onClick={handleClickMenu}>
          <Link
            to="/favorites"
            className="hover:underline underline-offset-8 text-3xl md:text-xl flex"
          >
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
