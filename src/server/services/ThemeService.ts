import { BaseRESTService } from "@/server/services/BaseRESTService";
import { UserTheme, SiteTheme } from "@/server/models";

interface FindRequest {
  id?: number;
  ownerId?: number;
}

interface UpdateRequest {
  ownerId: number;
  theme: string;
}

interface CreateRequest {
  ownerId: number;
  theme: string;
}

class ThemeService implements BaseRESTService {
  public find = ({ownerId}: FindRequest) => {

    return UserTheme.findOne({
      where: {
        ownerId: ownerId
      },
    });
  };

  public findAll = () => {
    return SiteTheme.findAll({
      attributes: ['theme']
    });
  }

  public update = async (data: UpdateRequest) => {
    const foundThemeId = await SiteTheme.findOne({
      attributes: ['id'],
      where: {
        theme: data.theme
      }
    });

    if(foundThemeId !== null) {
      const foundCurrentTheme = await this.find({ownerId: data.ownerId});

      return foundCurrentTheme?.update({themeId: foundThemeId.id})
    }
  }

  public create = async (data: CreateRequest) => {
    try {
      const foundId = await SiteTheme.findOne({
        attributes: ['id'],
        where: {
          theme: data.theme
        }
      });

      if (foundId !== null) {
        const themeData = {ownerId: data.ownerId, themeId: foundId.id}
        return UserTheme.create(themeData);
      } else {
        throw new Error(`There is no theme with name: ${data.theme}`);
      }
    } catch(error) {
      console.error(error);
    }
  }
}

export const themeService = new ThemeService();