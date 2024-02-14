import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SimilarMoviesSlider from '../../Components/similarMoviesSlider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const ActorPage = () => {
  const [details, setDetails] = useState([]);
  const [moviesOfActor, setMoviesOfActor] = useState([]);
  const [imagessOfActor, setImagesOfActor] = useState([]);
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

  return (
    <>
      <div className='flex flex-col items-center md:items-start md:flex-row gap-5 ite className="h-[500px] max-w-[1300px]  m-auto mt-20 px-4'>
        <div className="max-w-[400px] min-w-[300px]">
          <img
            src={`https://image.tmdb.org/t/p/original/${details.profile_path}`}
            alt={details.name}
          />
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
