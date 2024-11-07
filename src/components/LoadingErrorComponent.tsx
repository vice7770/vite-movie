import React from "react";

interface LoadingErrorProps {
  isLoading: boolean;
  error: boolean;
}

const LoadingError: React.FC<LoadingErrorProps> = ({ isLoading, error }) => {
  return (
    <div className='flex w-full h-[400px] bg-black text-white items-center justify-center'>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error, please refresh the page</p>}
    </div>
  );
};

export default LoadingError;