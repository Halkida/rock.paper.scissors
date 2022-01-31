import { AxiosInstance } from 'axios';
import getAxiosInstance from '@/utils/axios';
import { IComment, CommentCreation } from '@/types/Forum';

export type GetListParams = {
  params: { topicId: number },
};

type CommentCreationQuery = {
  params: CommentCreation,
};

class CommentApi {
  http: AxiosInstance;

  constructor() {
    this.http = getAxiosInstance('/comment');
  }

  getList = (params: GetListParams): Promise<IComment[]> => {
    return this.http
      .get('/', { params })
      .then(response => response.data);
  };

  create = ({ params }: CommentCreationQuery) => {
    return this.http
      .post('/', params)
      .then((response) => response.data);
  };
}

export default new CommentApi();