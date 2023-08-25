import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { ServerURL } from '../../assets/consts';

import { FetchGamesArgs, Game } from '../../types/redux/types';

export const fetchGames = createAsyncThunk<Game[], FetchGamesArgs>(
    'games/fetchGamesStatus',
    async (params) => {
      const { platform, genre, sort } = params;
      const { data } = await axios.get<Game[]>(
          `${ServerURL}games?platform=${platform}&category=${genre}&sort-by=${sort}`);

      return data;
    }
);
