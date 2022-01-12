import { BaseRESTService } from "@/server/services/BaseRESTService";
import { UserTheme } from "@/server/models";

const DEFAULT_THEME = 'dark'

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
      return this.create(data);
    } else {
      return foundTheme.update({theme: data.theme})

    }
  }

  public request = async (ownerId: number) => {
    const foundRecord = await this.find(ownerId);

    if (foundRecord === null) {
      // @ts-ignore
      return UserTheme.build({ownerId: ownerId, theme: DEFAULT_THEME});
    } else {
      return foundRecord;
    }
  }

  public create = async (data: CreateRequest) => {
    // @ts-ignore
    return UserTheme.create(data);
  }
}

export const themeService = new ThemeService();