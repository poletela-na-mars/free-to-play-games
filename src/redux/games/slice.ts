import { createSlice } from '@reduxjs/toolkit';

import { fetchGames } from './asyncActions';

import { GamesState } from '../../types/redux/types';

import { Status } from '../../assets/consts';

const initialState: GamesState = {
  games: [],
  status: Status.LOADING,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames(state, actions) {
      state.games = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGames.pending, (state) => {
      state.status = Status.LOADING;
      state.games = [];
    })
        .addCase(fetchGames.fulfilled, (state, action) => {
          state.games = action.payload;
          state.status = Status.SUCCESS;
        })
        .addCase(fetchGames.rejected, (state) => {
          state.status = Status.ERROR;
          state.games = [];
        })
  }
});

export const { setGames } = gamesSlice.actions;

export default gamesSlice.reducer;
