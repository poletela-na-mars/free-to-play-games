import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterState } from '../../types/redux/types';

import { genresListLen, platformsListLen, sortsListLen } from '../../assets/consts';

const initialState: FilterState = {
  platform: 0,
  genre: 0,
  sort: 0,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPlatform(state, action: PayloadAction<number>) {
      state.platform = action.payload;
    },
    setGenre(state, action: PayloadAction<number>) {
      state.genre = action.payload;
    },
    setSort(state, action: PayloadAction<number>) {
      state.sort = action.payload;
    },
    setFilters(state, action) {
      // to be honest, it'd be better to type filters as strings with their certain values to make code safer,
      // but that is the way I chose :)

      if (0 <= action.payload.platform && action.payload.platform <= platformsListLen) state.platform =
          action.payload.platform;
      if (0 <= action.payload.genre && action.payload.genre <= genresListLen) state.genre = action.payload.genre;
      if (0 <= action.payload.sort && action.payload.sort <= sortsListLen) state.sort = action.payload.sort;
    },
  }
});

export const { setPlatform, setSort, setGenre, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
