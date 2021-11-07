import BaseApi from '@/modules/base-api';

class AuthApi extends BaseApi {
  constructor() {
    super('/auth');
  }

  getUser(): Promise<string> {
    return this.http.get('/user');
  }
}

export default new AuthApi();
