import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError
} from 'axios';

const baseConfig: AxiosRequestConfig = {
  timeout: 3000,
  withCredentials: true,
};

type GetAxiosInstance = (baseURL?: string) => AxiosInstance;

const getAxiosInstance: GetAxiosInstance = (baseURL = '/') => (
  axios.create({
    ...baseConfig,
    baseURL,
  })
);

const isAxiosError = axios.isAxiosError;
export default getAxiosInstance;
export { AxiosError, isAxiosError };