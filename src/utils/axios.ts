import axios, {
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';

const baseConfig: AxiosRequestConfig = {
  timeout: 1000,
};

const baseInstance: AxiosInstance = axios.create({
  ...baseConfig,
  baseURL: 'https://ya-praktikum.tech/api/v2',
});

export default baseInstance;
