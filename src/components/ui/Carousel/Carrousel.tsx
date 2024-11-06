import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Autoplay } from 'swiper/modules';
import { getImageURL } from '@/lib/utils';

interface Props {
    elements: {
        id: number;
        title?: string;
        poster_path: string;
        name?: string;
    }[];
}
  
function Carousel( props : Props) {
    const { elements } = props;

    return (
        <Swiper
                slidesPerView={6}
                spaceBetween={0}
                speed={10000}
                loop={true}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                onPause={() => console.log('pause')}
                autoplay={{
                    disableOnInteraction: true,
                    waitForTransition: true,
                }}
                
                modules={[Autoplay]}
                className="flex w-full h-[400px]"
            >
                {elements.map((elem, index) => (
                    <SwiperSlide key={index} className="flex w-full text-center text-white bg-black" style={{ transition: 'height 0.5s ease-in-out' }} onClick={() => {}}>
                        <div className='flex flex-col items-center justify-center w-full h-full'>
                            <img src={getImageURL(elem.poster_path)} alt={elem.title ? elem.title : elem.name} className='h-full w-full object-contain' />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
    );
}

export default Carousel;