import { AxiosInstance } from 'axios';
import getAxiosInstance from '@/utils/axios';

export default class BaseApi {
  http: AxiosInstance;

  constructor(baseUrl: string) {
    this.http = getAxiosInstance(baseUrl);
  }
}
