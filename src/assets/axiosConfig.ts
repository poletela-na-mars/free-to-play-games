import axios from 'axios';
import axiosRetry from 'axios-retry';
import {
  AxiosStorage,
  buildStorage,
  buildWebStorage,
  CacheRequestConfig,
  MaybePromise,
  NotEmptyStorageValue,
  setupCache,
  StorageValue
} from 'axios-cache-interceptor';

import { NO_REQUEST_TIME, ServerURL } from './consts';

export const axiosHomeInstance = axios.create({
  baseURL: ServerURL,
  timeout: 30000,
});

axiosRetry(axiosHomeInstance, {
  retries: 3,
  retryDelay: () => 4000,
  shouldResetTimeout: true,
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

export const axiosGameInstance = axios.create({
  baseURL: ServerURL,
  timeout: 30000,
  headers: { 'Cache-Control': 'no-cache' },
});

const ttlCache = (delegate: AxiosStorage, ttl: number): AxiosStorage => {
  return buildStorage({
    remove(key: string, currentRequest: CacheRequestConfig | undefined): MaybePromise<void> {
      return delegate.remove(key, currentRequest);
    },
    set(key: string, value: NotEmptyStorageValue, currentRequest: CacheRequestConfig | undefined): MaybePromise<void> {
      value.ttl = ttl;

      return delegate.set(key, value, currentRequest);
    },
    find(key: string, currentRequest: CacheRequestConfig | undefined): MaybePromise<StorageValue> {
      return delegate.get(key, currentRequest);
    }
  });
};

setupCache(axiosGameInstance, {
  storage: ttlCache(buildWebStorage(localStorage, 'axios-cache:'), NO_REQUEST_TIME)
});
