import React from 'react'
import brand1 from '../../../assets/brands/casio.png'
import brand2 from '../../../assets/brands/amazon.png'
import brand3 from '../../../assets/brands/star.png'
import brand4 from '../../../assets/brands/moonstar.png'
import brand5 from '../../../assets/brands/amazon_vector.png'
import brand6 from '../../../assets/brands/start_people.png'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

// Swiper CSS
import "swiper/css";


const brandLogos = [brand1, brand2, brand3, brand4, brand5, brand6];

function Brand() {
  return (
    <Swiper
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      spaceBetween={30}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={4}

      breakpoints={{
        320: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}



      modules={[Autoplay, Pagination]}
      className="mySwiper my-6"
    >
      {brandLogos.map((logo, i) => (
        <SwiperSlide key={i}>
          <img src={logo} alt="brand" className="w-24 mx-auto" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Brand
