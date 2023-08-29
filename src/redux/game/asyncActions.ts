import { createAsyncThunk } from '@reduxjs/toolkit';
// TODO - axiosGameInstance
import { axiosHomeInstance } from '../../assets/axiosConfig';

import { sensitiveHeaders, ServerURL } from '../../assets/consts';

import { FetchGameArgs, FullGame } from '../../types/redux/types';

// TODO - pass {id: 'string!'}
export const fetchGame = createAsyncThunk<FullGame, FetchGameArgs>(
    'game/fetchGame',
    async (params) => {
      const options = {
        method: 'GET',
        url: `${ServerURL}/game`,
        params: {
          ...params
        },
        headers: sensitiveHeaders,
      };

      const { data } = await axiosHomeInstance.request<FullGame>(options);

      return data;
    }
);
