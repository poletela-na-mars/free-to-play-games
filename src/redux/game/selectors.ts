import { RootState } from '../store';

export const selectGame = (state: RootState) => state.gameSlice;
