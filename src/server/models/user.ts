
import { DataType, Model } from 'sequelize-typescript';
import { ModelAttributes } from 'sequelize/types';

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