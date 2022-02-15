import { BaseRESTService } from '@/server/services/BaseRESTService';
import { User } from '@/server/models';

interface CreateRequest {
  id: number;
  login: string;
  avatar?: string;
}

interface UpdateRequest {
  id: number;
  login: string;
  avatar?: string;
}

class UserService implements BaseRESTService {
  public find = (id: number) => {
    return User.findOne({
      where: {
        id: id
      },
    });
  };

  public request = async (id: number) => {
    return this.find(id);
  }

  public create = (data: CreateRequest) => {
    return User.create(data);
  }

  public update = async (data: UpdateRequest) => {
    const foundRecord = await this.find(data.id);

    if (foundRecord === null) {
      throw new Error('User not found');
    }
    foundRecord.set(data);

    return foundRecord.save();
  }
}

export const userService = new UserService();