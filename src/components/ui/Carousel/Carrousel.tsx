import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Autoplay } from 'swiper/modules';
import { getImageURL } from '@/lib/utils';
import clsx from 'clsx';

import playIcon from '@/assets/playIcon.svg';
import { useNavigate } from 'react-router';

interface Props {
    elements: {
        id: number;
        title?: string;
        poster_path: string;
        name?: string;
    }[];
    type?: 'movie' | 'tv';
}
  
function Carousel( props : Props) {
    const { elements, type } = props;
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleClick = (index: number, id: number) => {
        if(hoveredId === index){
            navigate(`/details/${type}/${id}`);
        }
    }
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
                    <SwiperSlide
                        key={index} 
                        className={clsx("flex w-full text-center text-white bg-black")} 
                        style={{ transition: 'height 0.5s ease-in-out' }}
                        onMouseEnter={() => setHoveredId(index)}
                        onClick={() => handleClick(index, elem.id)}
                    >
                        <div className={clsx('flex flex-col items-center justify-center w-full h-full transition-transform duration-300', {
                            'transform scale-105': hoveredId === index,
                            'transform scale-100': hoveredId !== index,
                        })}>
                            <img src={getImageURL(elem.poster_path)} alt={elem.title ? elem.title : elem.name} className='h-full w-full object-contain' />
                            {hoveredId === index && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <img src={playIcon} className="w-12 h-12" alt="Play icon" />
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
    );
}

export default Carousel;