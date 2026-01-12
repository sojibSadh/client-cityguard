import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../../assets/banner/banner1.png'
import bannerImg2 from '../../../assets/banner/banner2.png'
import bannerImg3 from '../../../assets/banner/banner3.png'

function Banner() {
  return (
    <div className='mb-8'>
      <Carousel autoPlay={true} infiniteLoop={true}>
        <div className="overflow-hidden">
          <img
            src={bannerImg1}
            className="w-full object-cover h-[200px] sm:h-[300px] md:h-[550px] "
          />
          <p className="legend">Legend 1</p>
        </div>

        <div className="overflow-hidden">
          <img
            src={bannerImg2}
            className="w-full object-cover h-[200px] sm:h-[300px] md:h-[550px] "
          />
          <p className="legend">Legend 2</p>
        </div>

        <div className="overflow-hidden">
          <img
            src={bannerImg3}
            className="w-full object-cover h-[200px] sm:h-[300px] md:h-[550px] "
          />
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  )
}

export default Banner
