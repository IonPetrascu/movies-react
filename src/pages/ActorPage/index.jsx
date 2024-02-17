import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SimilarMoviesSlider from '../../Components/similarMoviesSlider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow } from 'swiper/modules';
import { useSelector, useDispatch } from 'react-redux';
import { addActorToFavorites } from '../../store/favoritesSlice';
import toast from 'react-hot-toast';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const ActorPage = () => {
  const [details, setDetails] = useState([]);
  const [favorites, setFavorites] = useState(false);
  const [moviesOfActor, setMoviesOfActor] = useState([]);
  const [imagessOfActor, setImagesOfActor] = useState([]);
  const { actors } = useSelector((state) => state.favoritesSlice);
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    getDetails();
    getMovieOfActor();
    getImagesOfActor();
  }, [id]);

  const getDetails = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
    );

    setDetails(data);
  };
  const getMovieOfActor = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
    );

    setMoviesOfActor(data.cast);
  };
  const getImagesOfActor = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`,
    );

    setImagesOfActor(data.profiles);
  };

  useEffect(() => {
    actors.some((el) => {
      if (el.id === Number(id)) {
        setFavorites(true);
      }
    });
  }, []);

  useEffect(() => {
    if (isMounted) {
      const json = JSON.stringify(actors);
      localStorage.setItem('actors', json);
    }
    isMounted.current = true;
  }, [actors]);

  const addActorFavorite = (e) => {
    favorites
      ? toast.success('The actor has been successfully removed from favorites!')
      : toast.success('The actor has been successfully added to favorites!');

    setFavorites(!favorites);
    const actor = {
      ...details,
    };
    dispatch(addActorToFavorites(actor));
  };

  return (
    <>
      <div className='flex flex-col items-center md:items-start md:flex-row gap-5 ite className="h-[500px] max-w-[1300px]  m-auto mt-20 px-4'>
        <div className="max-w-[400px] min-w-[300px] relative">
          {details.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/original/${details.profile_path}`}
              alt={details.name}
            />
          ) : (
            <img
              src="https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
              alt={details.name}
            />
          )}
          <div onClick={addActorFavorite} className="absolute top-3 left-4 w-auto">
            {favorites ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-4xl text-center md:text-start font-semibold">{details.name}</h1>
          <div className="text-center md:text-start">
            <ul className="flex flex-col gap-2 py-6  text-lg">
              {details.birthday && <li>Date of Birth : {details.birthday}</li>}
              {details.place_of_birth && <li>Place of Birth : {details.place_of_birth}</li>}
              {details.popularity && <li>Popularity : {details.popularity}</li>}
              {moviesOfActor.length > 0 && <li>Movies : {moviesOfActor.length}</li>}
            </ul>
          </div>
          {details.biography && <div> {details.biography}</div>}
        </div>
      </div>
      {imagessOfActor.length >= 3 && (
        <div className='className="h-[500px] max-w-[1300px] m-auto mt-20 px-4'>
          <h2 className="text-4xl text-center md:text-start font-bold md:pl-6 mb-5">Gallery</h2>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            {imagessOfActor.map((image, id) => {
              return (
                <SwiperSlide key={id} className="h-[500px] w-[400px]">
                  <img
                    className="object-cover w-full"
                    src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}

      <div className='className="h-[500px] max-w-[1300px] m-auto mt-20'>
        <h2 className="text-4xl text-center md:text-start font-bold md:pl-6 mb-5">Movies</h2>
        <SimilarMoviesSlider similarMovies={moviesOfActor} />
      </div>
    </>
  );
};

export default ActorPage;
