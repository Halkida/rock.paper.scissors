import { AxiosInstance } from 'axios';
import getAxiosInstance, { AxiosError, isAxiosError } from '@/utils/axios';
class AuthApi {
  http: AxiosInstance;

  constructor() {
    this.http = getAxiosInstance('https://ya-praktikum.tech/api/v2/auth');
  }

  getUser(): Promise<string> {
    return this.http.get('/user');
  }

  signIn(data: Record<string, unknown>): Promise<unknown> {
    return this.http.post('/signin', data)
      .catch((error: Error | AxiosError) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          if (status && status === 401) {
            throw new Error('Неверный логин или пароль');
          } else {
            throw new Error('Непредвиденная ошибка');
          }
        } else {
          throw error;
        }
      });
  }

  signUp(data: Record<string, unknown>): Promise<unknown> {
    return this.http.post('/signup', data)
      .catch((error: Error | AxiosError) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          if (status && status === 409) {
            throw new Error('Пользователь с такими данными существует');
          } else {
            throw new Error('Непредвиденная ошибка');
          }
        } else {
          throw error;
        }
      });
  }
}

export default new AuthApi();
