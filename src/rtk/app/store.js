import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

import movieReducer from '../features/movieSlice';
import movieDetailReducer from '../features/detailMovieSlice';

const logger = createLogger();

const store = configureStore({
  reducer: {
    movie: movieReducer,
    detailMovie: movieDetailReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
