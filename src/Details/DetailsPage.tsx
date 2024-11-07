import React, { useEffect, useRef, useState } from 'react';

import { DetailsMovieResponse, DetailsTVShowResponse } from '@/types/api';
import { getImageURL, getMovieDetails, getTVShowDetails } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

interface Props {
    id: string;
    type: string;
}

function DetailsPage(props : Props) {
    const { id, type } = props;
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const queryKey = type === 'movie' ? ['movieDetails', id] : ['tvShowDetails', id];
    const queryFn = type === 'movie' ? () => getMovieDetails(id) : () => getTVShowDetails(id);

    const {
        data,
        error,
        isLoading,
    } = useQuery<DetailsMovieResponse | DetailsTVShowResponse>({
        queryKey,
        queryFn,
        retry: 0,
    });

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
                    <img src={getImageURL(data?.poster_path ?? '')} alt={data?.id.toString()} className='h-full w-full object-contain' />
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
                <p className="mb-2">{data?.vote_average}/10</p>
                <p className="mb-2">{data?.genres.map(elem => elem.name).join(', ')}</p>
                <p className="mb-4">
                    {data?.overview}
                </p>
            </div>
        )}
        </div>
    );
}

export default DetailsPage;