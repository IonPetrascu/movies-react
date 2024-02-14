import React from 'react';
import Actor from '../actor';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

const TopCast = ({ actors }) => {
  return (
    <>
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
        {actors &&
          actors.map((actor) => {
            return (
              <SwiperSlide className="flex items-center justify-center" key={actor.id}>
                <Actor {...actor} />
              </SwiperSlide>
            )
          })}
      </Swiper>
    </>
  );
};

export default TopCast;
