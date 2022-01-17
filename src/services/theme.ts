import { AxiosInstance } from 'axios';
import { THEMES } from '@/constants/themes';
import getAxiosInstance from '@/utils/axios';

export type GetTheme = {
  ownerId: number,
};

export type ThemeParams = {
  theme: THEMES,
};

export type PostTheme = GetTheme & ThemeParams;

class ThemeApi {
  http: AxiosInstance;

  constructor() {
    this.http = getAxiosInstance();
  }

  getTheme(params: GetTheme): Promise<ThemeParams> {
    return this.http
      .get<ThemeParams>(
          '/theme',
          { params },
        )
      .then((response) => response.data);
  }

  postTheme(data: PostTheme): Promise<void> {
    return this.http.post(
      '/theme',
      data,
    );
  }

}

export default new ThemeApi();
