import React from 'react';

const MovieCard = ({ data, openModal }) => {
  return (
    <div
      onClick={() => {
        openModal(data);
      }}
      className='flex flex-col items-center space-y-2 w-full lg:w-1/5 h-[500px] lg:h-[600px] bg-prussianBlue text-aliceBlue p-4 rounded'
    >
      <img
        src={data.Poster}
        alt={`${data.Title}'s poster`}
        className='h-4/5 w-full'
      />
      <h1 className='font-bold text-xl text-center h-16'>{data.Title}</h1>
      <span className='font-bold text-lg'>{data.Year}</span>
    </div>
  );
};

export default MovieCard;
