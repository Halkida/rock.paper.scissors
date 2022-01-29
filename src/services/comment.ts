import { AxiosInstance } from 'axios';
import getAxiosInstance from '@/utils/axios';
import { IComment, CommentCreation } from '@/types/Forum';

export type GetListParams = {
  params: { topicId: number },
};

class CommentApi {
  http: AxiosInstance;

  constructor() {
    this.http = getAxiosInstance('/comment');
  }

  getList(params: GetListParams): Promise<IComment> {
    return this.http
      .get('/', { params })
      .then(response => response.data);
  }

  create(data: CommentCreation) {
    return this.http
      .post('/', data)
      .then((response) => response.data);
  }
}

export default new CommentApi();