import { AxiosInstance } from 'axios';
import getAxiosInstance from '@/utils/axios';

export type PostTopic = {
  authorId: number;
  content: string;
  title: string;
}

class TopicApi {
  http: AxiosInstance;

  constructor() {
    this.http = getAxiosInstance('/');
  }

  getAllTopics() {
    return this.http.get('/topics')
      .then((response) => response.data);
  }

  getTopic(id: number) {
    return this.http.get(`/topics?id=${id}`)
      .then((response) => response.data);
  }

  postTopic(data: PostTopic) {
    return this.http.post('/topics/create', data);
  }
}

export default new TopicApi();