import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchGame } from './asyncActions';

import { Game, GameState } from '../../types/redux/types';
import { Status } from '../../assets/consts';

const initialState: GameState = {
  game: {},
  status: Status.LOADING,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGame(state, action: PayloadAction<Game>) {
      state.game = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGame.pending, (state) => {
      state.status = Status.LOADING;
    })
        .addCase(fetchGame.fulfilled, (state, action) => {
          state.game = action.payload;
          state.status = Status.SUCCESS;
        })
        .addCase(fetchGame.rejected, (state) => {
          state.status = Status.ERROR;
          state.game = {};
        })
  }
});

export const { setGame } = gameSlice.actions;

export default gameSlice.reducer;
