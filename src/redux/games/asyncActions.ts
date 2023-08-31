import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosHomeInstance } from '../../assets/axiosConfig';

import {
  genresListForReq,
  LIMIT_GAMES,
  platformsListForReq,
  sensitiveHeaders,
  sortsListForReq
} from '../../assets/consts';

import { FetchGamesArgs, FullGameInList } from '../../types/redux/types';

export const fetchGames = createAsyncThunk<FullGameInList[], FetchGamesArgs>(
    'games/fetchGames',
    async (params) => {
      const { platform, genre, sort, currentPage } = params;

      const axiosParams = {
        ...(platformsListForReq[platform] ? { platform: platformsListForReq[platform] } : {}),
        ...(genresListForReq[genre] ? { category: genresListForReq[genre] } : {}),
        ...(sortsListForReq[sort] ? { 'sort-by': sortsListForReq[sort] } : {}),
      };

      const options = {
        method: 'GET',
        url: '/games',
        params: {
          ...axiosParams
        },
        headers: sensitiveHeaders,
      };

      const { data } = await axiosHomeInstance.request<FullGameInList[]>(options);

      return data.slice(currentPage * LIMIT_GAMES, (currentPage + 1) * LIMIT_GAMES);
    }
);
