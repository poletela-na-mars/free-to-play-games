import { RootState } from '../store';

export const selectGames = (state: RootState) => state.gamesSlice;
