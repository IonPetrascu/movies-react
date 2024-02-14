import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Card from '../Card';

import 'swiper/css';
import 'swiper/css/navigation';

const SimilarMoviesSlider = ({ similarMovies }) => {
  return (
    <Swiper
      className="p-4 "
      slidesPerView={1}
      navigation={true}
      spaceBetween={7}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1100: {
          slidesPerView: 4,
          spaceBetween: 5,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 5,
        },
      }}
      modules={[Navigation]}
    >
      {similarMovies.length > 0 &&
        similarMovies.map((movie) => {
          return (
            <SwiperSlide className="flex items-center justify-center" key={movie.id}>
              <Card {...movie} />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default SimilarMoviesSlider;
