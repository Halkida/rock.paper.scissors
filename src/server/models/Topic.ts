import {
  Model,
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  DataType,
  AllowNull,
  Unique,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './User';
import { Comment } from './Comment';


type TopicAttributes = {
  id: number,
  title: string,
  authorId: number,
  content: string,
  createAt: string,
  updateAt: string,
  commentsIds: number[],
}
type TopicCreationAttributes = Omit<TopicAttributes, 'id'>;

@Table({
  timestamps: true,
  tableName: 'rps_topic'
})
export class Topic extends Model<TopicAttributes, TopicCreationAttributes> {
  @AutoIncrement
  @Unique
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  authorId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  content: string;

  @ForeignKey(() => Comment)
  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
  commentsIds: string[];
}