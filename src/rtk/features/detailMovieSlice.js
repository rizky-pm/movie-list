import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_KEY, API_URL } from '../../constants/index';

const initialState = {
  isFetching: false,
  detail: {},
  error: '',
};

export const fetchMovieDetail = createAsyncThunk(
  'detailMovie/fetchMovieDetail',
  async (imdbID) => {
    return axios
      .get(API_URL + '?apikey=' + API_KEY + '&i=' + imdbID)
      .then((response) => response.data);
  }
);

const movieDetailSlice = createSlice({
  name: 'detailMovie',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMovieDetail.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
      state.isFetching = false;
      state.detail = action.payload;
      state.error = '';
    });

    builder.addCase(fetchMovieDetail.rejected, (state, action) => {
      state.isFetching = false;
      state.detail = {};
      state.error = action.error.message;
    });
  },
});

export default movieDetailSlice.reducer;
