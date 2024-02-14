import React from 'react';
import { Link } from 'react-router-dom';

const Actor = ({ id, character, name, profile_path }) => {
  return (
    <div className="flex flex-col max-w-auto">
      <Link to={`/person/${id}`}>
        {profile_path ? (
          <img
            className="w-[200px] h-[200px] object-cover hover:scale-110 transition-all ease-linear rounded-full overflow-hidden m-auto"
            src={`https://image.tmdb.org/t/p/original/${profile_path}`}
            alt={name}
          />
        ) : (
          <img
            className="w-[200px] h-[200px] rounded-full overflow-hidden m-auto"
            src={`https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg`}
            alt={name}
          />
        )}
      </Link>

      <div className="text-center bg-black opacity mt-4">
        <h4 className="font-bold text-xl">{character}</h4>
        <span className="font-bold text-xl">{name}</span>
      </div>
    </div>
  );
};

export default Actor;
