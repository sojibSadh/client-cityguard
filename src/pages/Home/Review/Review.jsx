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
        <div>
            <h2>review</h2>


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
                    scale: 0.75,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Autoplay, Pagination]}
                className="mySwiper"
            >

                {
                    reviewData.map(review => <SwiperSlide>
                        <div className='space-y-6 bg-base-100 shadow-lg rounded-xl p-5 border border-gray-200'>
                            <FaQuoteLeft className='text-primary text-2xl mb-4 opacity-70' />
                            <p>{review.review}</p>
                            <div className='flex justify-start gap-6'>
                                <img className='w-10 h-10 rounded-full' src={review.user_photoURL} alt="" />
                                <div className='text-left'>
                                    <h4>{review.userName}</h4>
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
