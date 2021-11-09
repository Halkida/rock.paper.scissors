import { AxiosInstance } from 'axios';
import getAxiosInstance from '@/utils/axios';
class AuthApi {
  http: AxiosInstance;

  constructor() {
    this.http = getAxiosInstance('https://ya-praktikum.tech/api/v2/auth');
  }

  getUser(): Promise<string> {
    return this.http.get('/user');
  }
}

export default new AuthApi();
