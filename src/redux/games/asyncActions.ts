import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRetry from 'axios-retry';
import { axiosHomeInstance } from '../../assets/axiosConfig';

import {
  genresListForReq,
  LIMIT_GAMES,
  platformsListForReq,
  sensitiveHeaders,
  ServerURL,
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
        url: `${ServerURL}/games`,
        params: {
          ...axiosParams
        },
        headers: sensitiveHeaders,
      };

      // axiosRetry(axiosHomeInstance, {
      //   retries: 3,
      //   retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 1000),
      //   retryCondition: (error) => {
      //     switch (error.response?.status) {
      //       case 404:
      //       case 429:
      //       case 500:
      //       case 502:
      //       case 503:
      //       case 504:
      //         return true;
      //       default:
      //         return false;
      //     }
      //   },
      // });

      const { data } = await axiosHomeInstance.request<FullGameInList[]>(options);

      return data.slice(currentPage * LIMIT_GAMES, (currentPage + 1) * LIMIT_GAMES);
    }
);
