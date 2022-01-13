import {
  Model,
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  DataType,
  AllowNull,
  Unique
} from 'sequelize-typescript';

type UserAttributes = {
  id: number;
  login: string;
  avatar: string;
}
type UserCreationAttributes = Omit<UserAttributes, 'id'>;

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user'
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @AutoIncrement
  @Unique
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  login: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  avatar: number;
}