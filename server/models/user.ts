
import { DataType } from 'sequelize-typescript';

export type IUser = {
  firstName: string;
  lastName: string;
}

export type IUserInDB = IUser & { id: number };

export const userModel = {
  firstName: {
    type: DataType.STRING,
    allowNull: false
  },
  lastName: {
    type: DataType.STRING,
  },
};