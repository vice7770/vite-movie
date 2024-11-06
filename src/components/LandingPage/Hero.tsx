import react from 'react';
import HERO from '@/assets/movie-poster-background-jd1c45cjm7vba7gg.webp';

const Hero = () => {
  return (
    <section className='relative flex h-full w-full'>
      <img src={HERO} alt='hero-image' className='w-full h-full object-cover' />
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='absolute inset-0 flex items-center justify-center'>
        <h1 className='text-white text-4xl md:text-6xl font-bold'>Welcome to Movie App</h1>
      </div>
    </section>
  );
};

export default Hero;
