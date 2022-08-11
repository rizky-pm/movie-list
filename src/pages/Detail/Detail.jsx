import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchMovieDetail } from '../../rtk/features/detailMovieSlice';

const Detail = () => {
  const { imdbID } = useParams();
  const movieDetailState = useSelector((state) => state.detailMovie);
  const dispatch = useDispatch();

  console.log(movieDetailState);

  useEffect(() => {
    dispatch(fetchMovieDetail(imdbID));
  }, []);

  return (
    <div className='flex flex-col space-y-2 font-source-sans-pro py-2 px-4 lg:py-8 lg:px-20'>
      <h1 className='font-bold text-4xl uppercase text-center lg:text-left'>
        {movieDetailState?.detail.Title}
      </h1>

      <div className='flex flex-col lg:flex-row space-x-4'>
        <img
          src={movieDetailState?.detail.Poster}
          alt={`${movieDetailState?.detail.Title}'s Poster`}
        />

        <div className='flex flex-col text-xl text-center lg:text-left'>
          <p>
            <span className='font-bold'>Actors :</span>{' '}
            {movieDetailState?.detail.Actors}
          </p>
          <p>
            <span className='font-bold'>Director :</span>{' '}
            {movieDetailState?.detail.Director}
          </p>
          <p>
            <span className='font-bold'>Genre :</span>{' '}
            {movieDetailState?.detail.Genre}
          </p>
          <p>
            <span className='font-bold'>Year :</span>{' '}
            {movieDetailState?.detail.Year}
          </p>
          <p>
            <span className='font-bold'>Runtime :</span>{' '}
            {movieDetailState?.detail.Runtime}
          </p>
          <p>
            <span className='font-bold'>Released :</span>{' '}
            {movieDetailState?.detail.Released}
          </p>
          <p>
            <span className='font-bold'>Rated :</span>{' '}
            {movieDetailState?.detail.Rated}
          </p>
          <p>
            <span className='font-bold'>Awards :</span>{' '}
            {movieDetailState?.detail.Awards}
          </p>
          <p>
            <span className='font-bold'>Imdb Rating :</span>{' '}
            {movieDetailState?.detail.imdbRating}
          </p>
          <p>
            <span className='font-bold'>Imdb Votes :</span>{' '}
            {movieDetailState?.detail.imdbVotes}
          </p>
          <p>
            <span className='font-bold'>Plot :</span>{' '}
            {movieDetailState?.detail.Plot}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
