import { BaseRESTService } from '@/server/services/BaseRESTService';
import {
  Topic,
  TopicCreateAttributes,
  TopicUpdateAttributes,
} from '@/server/models/Topic';

class TopicService implements BaseRESTService {
  public find = (id: number) => {
    return Topic.findOne({
      where: {
        id: id
      },
    });
  };

  public request = async (id: number) => {
    return this.find(id);
  };

  public create = (data: TopicCreateAttributes) => {
    return Topic.create(data);
  };

  public update = async (data: TopicUpdateAttributes) => {
    const record = await this.find(data.id);

    if (record === null) {
      throw new Error('Topic not found');
    }
    record.set(data);

    return record.save();
  };

  public findAll = async () => {
    return Topic.findAll();
  };
}

export const topicService = new TopicService();