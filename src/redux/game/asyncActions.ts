import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosGameInstance } from '../../assets/axiosConfig';

import { sensitiveHeaders } from '../../assets/consts';

import { FetchGameArgs, FullGame } from '../../types/redux/types';

export const fetchGame = createAsyncThunk<FullGame, FetchGameArgs>(
    'game/fetchGame',
    async (params) => {
      const options = {
        method: 'GET',
        url: '/game',
        params: {
          ...params
        },
        headers: sensitiveHeaders,
      };

      const { data } = await axiosGameInstance.request<FullGame>(options);

      return data;
    }
);
