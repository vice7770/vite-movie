import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsPage from './DetailsPage';
import ErrorPage from './ErrorPage';

function Details() {
  const { id, type } = useParams<{ id: string, type: string }>();

  if (!id || (!type || (type !== 'movie' && type !== 'tv'))) {
    return <ErrorPage />;
  }

  return (
    <div>
      <DetailsPage id={id} type={type} />
    </div>
  );
}

export default Details;