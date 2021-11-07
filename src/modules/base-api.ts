import { AxiosInstance } from 'axios';

export default class BaseApi {
  http: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.http = axios;
  }
}
