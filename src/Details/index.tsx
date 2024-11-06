import React, { useEffect, useRef, useState } from 'react';

function Details() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [isFullScreen]);

  const handlePlayFullScreen = () => {
    setIsFullScreen(true);
    if (videoRef.current) {
        
      videoRef.current.play();
      videoRef.current.requestFullscreen();
    }
  };

  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
    if (document.fullscreenElement) {
        
      document.exitFullscreen();
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center bg-black p-5">
      {isFullScreen && (
        <div className="absolute top-0 right-0 p-4 z-10">
          <button
            onClick={handleCloseFullScreen}
            className="bg-white text-black px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
      {isFullScreen && (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="https://rawgit.com/mediaelement/mediaelement-files/master/big_buck_bunny.mp4"
          muted
          autoPlay
        />
      )}
      {!isFullScreen && (
        <div className="flex flex-col w-full p-4 bg-black bg-opacity-75 text-white gap-y-3">
            <div className='flex w-full h-[400px] justify-center my-10'>
                <div className='flex w-[400px] bg-white' />
            </div>
            <div className="flex items-center justify-center gap-x-10">
                <h1 className="text-2xl font-bold mb-2">Big Buck Bunny</h1>
                <button
                onClick={handlePlayFullScreen}
                className="bg-white text-black px-4 py-2 rounded"
                >
                Play Trailer
                </button>
            </div>
            <p className="mb-2">Score: 8.5/10</p>
            <p className="mb-2">Release Date: April 10, 2008</p>
            <p className="mb-4">
                Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.
            </p>
        </div>
      )}
    </div>
  );
}

export default Details;