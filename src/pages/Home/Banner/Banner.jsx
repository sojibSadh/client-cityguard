import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../../assets/banner/banner1.png'
import bannerImg2 from '../../../assets/banner/banner2.png'
import bannerImg3 from '../../../assets/banner/banner3.png'

function Banner() {
  return (
    <div className='mb-8'>
       <Carousel autoPlay={true} infiniteLoop={true} >
                <div className='overflow-hidden'>
                    <img className='h-screen ' src={bannerImg1}/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img className='h-screen' src={bannerImg2} />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img className='h-screen' src={bannerImg3} />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
    </div>
  )
}

export default Banner
