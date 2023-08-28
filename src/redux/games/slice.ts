import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchGames } from './asyncActions';

import { FullGameData, GamesState } from '../../types/redux/types';

import { Status } from '../../assets/consts';

const initialState: GamesState = {
  games: [],
  currentPage: 0,
  status: Status.LOADING,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames(state, action: PayloadAction<FullGameData[]>) {
      state.games = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGames.pending, (state) => {
      state.status = Status.LOADING;
      // state.games = [];
    })
        .addCase(fetchGames.fulfilled, (state, action) => {
          state.games.push(...action.payload);
          state.status = Status.SUCCESS;
        })
        .addCase(fetchGames.rejected, (state) => {
          state.status = Status.ERROR;
          state.games = [];
          state.currentPage = 0;
        })
  }
});

export const { setGames, setCurrentPage } = gamesSlice.actions;

export default gamesSlice.reducer;
