import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { genresListForReq, platformsListForReq, ServerURL, sortsListForReq } from '../../assets/consts';

import { FetchGamesArgs, FullGameData } from '../../types/redux/types';

export const fetchGames = createAsyncThunk<FullGameData[], FetchGamesArgs>(
    'games/fetchGames',
    async (params) => {
      const { platform, genre, sort } = params;

      const axiosParams = {
        ...(platformsListForReq[platform] ? { platform: platformsListForReq[platform] } : {}),
        ...(genresListForReq[genre] ? { category: genresListForReq[genre] } : {}),
        ...(sortsListForReq[sort] ? { 'sort-by': sortsListForReq[sort] } : {}),
      };

      const options = {
        method: 'GET',
        url: ServerURL,
        params: {
          ...axiosParams
        },
        // TODO - Warning: in production sensitive info should be hidden
        headers: {
          'X-RapidAPI-Key': '6620decf15msh097fc5744cbf35fp1dc413jsn907640f36a5c',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };

      const { data } = await axios.request<FullGameData[]>(options);

      return data;
    }
);
