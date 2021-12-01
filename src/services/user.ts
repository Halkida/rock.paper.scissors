import { AxiosInstance } from 'axios';
import getAxiosInstance from '@/utils/axios';
import { IUser } from '@/types';

class UserApi {
  http: AxiosInstance;

  constructor() {
    this.http = getAxiosInstance('https://ya-praktikum.tech/api/v2');
  }
  
  changeProfile(data: IUser): Promise<IUser> {
    return this.http.put<IUser>('/user/profile', data)
      .then((response) => {
        return response.data;
      });
  }
  
  changePasswodr(data: {[key: string]: string}): Promise<{[key: string]: string}> {
    return this.http.put('/user/password', data);
  }
}

export default new UserApi();
