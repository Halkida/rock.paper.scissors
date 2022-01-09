import { AxiosInstance } from 'axios';
import getAxiosInstance from '@/utils/axios';

type ServiceIdData = {
  service_id: string
};

class OAuthApi {
  http: AxiosInstance;

  constructor() {
    this.http = getAxiosInstance('https://ya-praktikum.tech/api/v2/oauth/yandex');
  }

  getServiceId(): Promise<ServiceIdData> {
    return this.http
      .get<ServiceIdData>(
          '/service-id',
          { params: { ['redirect_uri']: window.location.origin } },
        )
      .then((response) => response.data);
  }

  sendCode(code: string): Promise<void> {
    return this.http.post(
      '',
      { code, ['redirect_uri']: window.location.origin },
    );
  }
}

export default new OAuthApi();
