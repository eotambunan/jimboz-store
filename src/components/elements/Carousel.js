// import Swiper core and required modules
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';

export default () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      className='relative border-2 rounded-lg w-1/4 h-96'
    >
      <SwiperSlide className='w-96 h-96'><Image src={"https://source.unsplash.com/random/cat"} layout='fill' objectFit="contain"  /></SwiperSlide>
      <SwiperSlide><Image src={"https://source.unsplash.com/random/dog"} layout='fill' objectFit="contain"  /></SwiperSlide>
      <SwiperSlide><Image src={"https://source.unsplash.com/random/horse"} layout='fill' objectFit="contain"  /></SwiperSlide>
      <SwiperSlide><Image src={"https://source.unsplash.com/random/cow"} layout='fill' objectFit="contain"  /></SwiperSlide>
    </Swiper>
  );
};