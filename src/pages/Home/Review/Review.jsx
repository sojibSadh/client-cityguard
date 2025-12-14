import React, { use } from 'react'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper CSS
import "swiper/css";
import { FaQuoteLeft } from 'react-icons/fa';

function Review({ reviewPromise }) {
    const reviewData = use(reviewPromise);
    console.log(reviewData);
    return (
        <div className="bg-[#D6D6D6]/10 py-20 rounded-2xl md:my-8">
            <div className="text-center mb-16">
                <h2 className="md:text-4xl text-[22px] font-bold text-orange-600 mb-4">
                What People Say About Our Service
                </h2>
                <p className="sub-title text-sm text-gray-100 max-w-2xl mx-auto">
                Our users love how simple, fast, and reliable our platform is. From smooth issue submission to real-time updates and quick resolutions, we are committed to delivering the best experience.
                </p>
            </div>


            <Swiper
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 30,
                    stretch: '50%',
                    depth: 200,
                    modifier: 1,
                    scale: 0.90,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Autoplay, Pagination]}
                className="mySwiper"
            >

                {
                    reviewData.map(review => <SwiperSlide>
                        <div className='space-y-6 bg-gray-800 shadow-lg rounded-xl p-5  shadow-orange-600'>
                            <FaQuoteLeft className='text-primary text-2xl mb-4 opacity-70' />
                            <p className='text-center text-xl'>{review.review}</p>
                            <div className='flex justify-center gap-6'>
                                <img className='w-10 h-10 rounded-full' src={review.user_photoURL} alt="" />
                                <div className='text-left'>
                                    <h4 className='text-orange-600'>{review.userName}</h4>
                                    <span>{review.pick_up_email}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    )
}

export default Review
