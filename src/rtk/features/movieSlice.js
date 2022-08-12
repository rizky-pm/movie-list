import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_KEY, API_URL } from '../../constants/index';

const initialState = {
  isFetching: false,
  movies: [],
  error: '',
  page: 2,
};

export const fetchMovie = createAsyncThunk('movie/fetchMovie', async (data) => {
  const { page, searchQuery } = data;

  return axios
    .get(API_URL + '?apikey=' + API_KEY + '&s=' + searchQuery + '&page=' + page)
    .then((response) => {
      console.log(response);
      if (response.data.Response === 'True') {
        console.log('Movie Found');
        return response.data.Search;
      } else {
        console.log('Movie Not Found');
        return response.data.Error;
      }
    });
});

export const fetchMoreMovie = createAsyncThunk(
  'movie/fetchMoreMovie',
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
  reducers: {
    resetPage: (state) => {
      state.page = 2;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovie.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(fetchMovie.fulfilled, (state, action) => {
      state.isFetching = false;
      state.movies = action.payload;
      state.error = '';
      state.page = 2;
    });

    builder.addCase(fetchMovie.rejected, (state, action) => {
      state.isFetching = false;
      state.movies = [];
      state.error = action.error.message;
      state.page = 2;
    });

    builder.addCase(fetchMoreMovie.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(fetchMoreMovie.fulfilled, (state, action) => {
      state.isFetching = false;
      state.movies = [...state.movies, ...action.payload].flat();
      state.error = '';
      state.page = state.page + 2;
    });

    builder.addCase(fetchMoreMovie.rejected, (state, action) => {
      state.isFetching = false;
      state.movies = [];
      state.error = action.error.message;
      state.page = 2;
    });
  },
});

console.log(movieSlice.actions);

export default movieSlice.reducer;
export const movieActions = {
  ...movieSlice.actions,
  fetchMovie,
  fetchMoreMovie,
};
