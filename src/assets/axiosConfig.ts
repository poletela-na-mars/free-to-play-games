import axios from 'axios';
import { ServerURL } from './consts';
import axiosRetry from 'axios-retry';

export const axiosHomeInstance = axios.create({
  baseURL: ServerURL,
  timeout: 10000
});

axiosRetry(axiosHomeInstance, {
  retries: 3,
  retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 1000),
  retryCondition: (error) => {
    switch (error.response?.status) {
      case 404:
      case 429:
      case 500:
      case 502:
      case 503:
      case 504:
        return true;
      default:
        return false;
    }
  },
});
