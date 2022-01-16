import { AxiosInstance } from 'axios';
import { Themes } from '@/constants/themes';
import getAxiosInstance from '@/utils/axios';

export type GetTheme = {
  ownerId: number,
};

export type ThemeParams = {
  theme: Themes,
};

export type PostTheme = GetTheme & ThemeParams;

class ThemeApi {
  http: AxiosInstance;

  constructor() {
    this.http = getAxiosInstance();
  }

  getTheme(params: GetTheme): Promise<ThemeParams> {
    console.log(params);
    return Promise.resolve({
      theme: Themes.dark,
    });
    // return this.http
    //   .get<GetTheme>(
    //       '/theme',
    //       { params },
    //     )
    //   .then((response) => response.data);
  }

  postTheme(data: PostTheme): Promise<void> {
    console.log(data);
    return new Promise((resolve) => {
      setTimeout(() => { resolve(); }, 1000);
    });
    // return this.http.post(
    //   '/theme',
    //   data,
    // );
  }

}

export default new ThemeApi();
