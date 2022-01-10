import { BaseRESTService } from "@/server/services/BaseRESTService";
import { UserTheme } from "@/server/models";


interface UpdateRequest {
  ownerId: number;
  theme: string;
}

interface CreateRequest {
  ownerId: number;
  theme: string;
}

class ThemeService implements BaseRESTService {
  public find = (ownerId: number) => {
    return UserTheme.findOne({
      where: {
        ownerId: ownerId
      },
    });
  };

  public update = async (data: UpdateRequest) => {
    const foundTheme = await this.find(data.ownerId);

    if(foundTheme === null) {
      //create new record
      return this.create(data);
    } else {
      return foundTheme.update({theme: data.theme})

    }
  }

  public request = async (ownerId: number) => {
    return UserTheme.findOrCreate({
      where: {
        ownerId: ownerId
      }
    });
  }

  public create = async (data: CreateRequest) => {
    return UserTheme.create(data);
  }
}

export const themeService = new ThemeService();