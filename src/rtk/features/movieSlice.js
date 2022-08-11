import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_KEY, API_URL } from '../../constants/index';

const initialState = {
  isFetching: false,
  movies: [],
  error: '',
};

export const fetchMovie = createAsyncThunk('movie/fetchMovie', async (data) => {
  const { page, searchQuery } = data;

  return axios
    .get(API_URL + '?apikey=' + API_KEY + '&s=' + searchQuery + '&page=' + page)
    .then((response) => response.data.Search);
});

export const newFetchMovie = createAsyncThunk(
  'movie/newFetchMovie',
  async (data) => {
    const { page, searchQuery } = data;

    return axios
      .get(
        API_URL + '?apikey=' + API_KEY + '&s=' + searchQuery + '&page=' + page
      )
      .then((response) => response.data.Search);
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMovie.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(fetchMovie.fulfilled, (state, action) => {
      state.isFetching = false;
      state.movies = [...state.movies, action.payload].flat();
      state.error = '';
    });

    builder.addCase(fetchMovie.rejected, (state, action) => {
      state.isFetching = false;
      state.movies = [];
      state.error = action.error.message;
    });

    builder.addCase(newFetchMovie.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(newFetchMovie.fulfilled, (state, action) => {
      state.isFetching = false;
      state.movies = action.payload;
      state.error = '';
    });

    builder.addCase(newFetchMovie.rejected, (state, action) => {
      state.isFetching = false;
      state.movies = [];
      state.error = action.error.message;
    });
  },
});

export default movieSlice.reducer;
