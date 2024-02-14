import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactPlayer from 'react-player/youtube';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';

const VideosSlider = ({ url }) => {

  return (
    <Swiper
      className="px-10 overflow-hidden h-[400px]"
      spaceBetween={30}
      slidesPerView={3}
      navigation={true}
      onSlideChange={() => console.log('slide change')}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        1:{
          slidesPerView: 1,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        1100: {
          slidesPerView: 2,
          spaceBetween: 50,
        },
      }}
      modules={[Navigation]}
    >
      {url && url.map((el) => (
            <SwiperSlide key={el.id}>
              <ReactPlayer
             
              light={true}
                controls={true}
                height={'100%'}
                width={'100%'}
                url={`https://www.youtube.com/watch?v=${el.key}`}
              />
            </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default VideosSlider;
