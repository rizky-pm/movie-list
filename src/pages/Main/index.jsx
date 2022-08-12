import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MovieCard from '../../components/MovieCard';
import SearchBar from '../../components/SearchBar';
import Modal from '../../components/Modal';

import { movieActions } from '../../rtk/features/movieSlice';

const Main = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);

  const movieState = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  const handleFetchMovies = (e, apiParameter) => {
    e.preventDefault();
    setScrollPosition(0);
    dispatch(movieActions.fetchMovie(apiParameter));
  };

  const handlefetchMoreMovies = (apiParameter) => {
    dispatch(movieActions.fetchMoreMovie(apiParameter));
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
      setScrollPosition(
        document.documentElement.offsetHeight - window.innerHeight - 25
      );
      if (movieState.movies) {
        setPage((prevState) => prevState + 1);
        console.log(page);
        const apiParameter = { page: movieState.page, searchQuery };
        handlefetchMoreMovies(apiParameter);
      }
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: scrollPosition,
    });
  }, [movieState]);

  return (
    <div className='text-prussianBlue px-10 py-10 flex flex-col items-center font-source-sans-pro'>
      <SearchBar setSearchQuery={setSearchQuery} />
      <button
        onClick={(e) => {
          console.log(page);
          dispatch(movieActions.resetPage());
          const apiParameter = { page: 1, searchQuery };
          handleFetchMovies(e, apiParameter);
        }}
        className='py-1 px-2 bg-sapphireBlue text-aliceBlue hover:bg-cgBlue transition w-full lg:w-[10%] rounded mt-4 mb-10'
      >
        Find
      </button>

      {movieState.isFetching && <span>Loading Data ...</span>}

      {!movieState.isFetching && movieState.error ? (
        <span>Something went wrong, please try again</span>
      ) : null}

      {typeof movieState.movies === 'string' && !movieState.isFetching ? (
        <span>{movieState.movies}</span>
      ) : !movieState.isFetching && movieState?.movies ? (
        <div className='flex flex-wrap items-center justify-center gap-8 lg:gap-8'>
          {movieState.movies?.map((movie, index) => (
            <MovieCard key={index} data={movie} openModal={openModal} />
          ))}
        </div>
      ) : (
        <div className='flex flec-col justify-center h-[50vh] items-center'>
          <span className='font-semibold text-xl uppercase'>
            No data, start search some movie
          </span>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        data={selectedMovie}
      />
    </div>
  );
};

export default Main;
