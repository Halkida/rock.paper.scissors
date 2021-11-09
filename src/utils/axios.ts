import axios, {
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';

const baseConfig: AxiosRequestConfig = {
  timeout: 1000,
  withCredentials: true,
};

type GetAxiosInstance = (baseURL: string) => AxiosInstance;

const getAxiosInstance: GetAxiosInstance = (baseURL) => (
  axios.create({
    ...baseConfig,
    baseURL,
  })
);

export default getAxiosInstance;
