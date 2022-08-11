import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MovieCard from '../../components/MovieCard';
import SearchBar from '../../components/SearchBar';
import Modal from '../../components/Modal';

import { fetchMovie, newFetchMovie } from '../../rtk/features/movieSlice';

const Main = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();

  const movieState = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  const handleFetchMovies = () => {
    const apiParameter = { page, searchQuery };
    setPage(page + 1);
    dispatch(fetchMovie(apiParameter));
  };

  const handleNewFetchMovies = () => {
    const apiParameter = { page, searchQuery };
    setPage(1);
    dispatch(newFetchMovie(apiParameter));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (movieData) => {
    setIsModalOpen(true);
    setSelectedMovie(movieData);
  };

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (movieState.movies) {
        handleFetchMovies();
      }
    }
  };

  return (
    <div className='text-prussianBlue space-y-10 px-10 py-10 flex flex-col items-center font-source-sans-pro'>
      <SearchBar setSearchQuery={setSearchQuery} />
      <button
        onClick={() => {
          movieState.movies.length === 0
            ? handleFetchMovies()
            : handleNewFetchMovies();
        }}
        className='py-1 px-2 bg-sapphireBlue text-aliceBlue hover:bg-cgBlue transition w-full lg:w-[10%] rounded'
      >
        Find
      </button>

      {movieState.isFetching && <span>Loading Data ...</span>}

      {!movieState.isFetching && movieState.error ? (
        <span>Something went wrong, please try again</span>
      ) : null}

      {!movieState.isFetching && movieState.movies?.length ? (
        <div className='flex flex-wrap items-center justify-center gap-8 lg:gap-2'>
          {movieState.movies?.map((movie, index) => (
            <MovieCard key={index} data={movie} openModal={openModal} />
          ))}
        </div>
      ) : null}

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        data={selectedMovie}
      />
    </div>
  );
};

export default Main;
