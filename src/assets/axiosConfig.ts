import axios from 'axios';
import { ServerURL } from './consts';

export const axiosHomeInstance = axios.create({
  baseURL: ServerURL,
  timeout: 10000
});
