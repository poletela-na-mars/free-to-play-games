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
      const { platform, genre, sort } = action.payload

      if (0 <= action.payload.platform && action.payload.platform <= platformsListLen) state.platform = platform;
      if (0 <= action.payload.genre && action.payload.genre <= genresListLen) state.genre = genre;
      if (0 <= action.payload.sort && action.payload.sort <= sortsListLen) state.sort = sort;
    },
  }
});

export const { setPlatform, setSort, setGenre, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
