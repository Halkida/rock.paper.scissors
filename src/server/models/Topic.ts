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
import { UserAttributes, User } from './User';
import { CommentAttributes, Comment } from './Comment';


type TopicAttributes = {
  id: number,
  title: string,
  authorId: UserAttributes,
  content: string,
  createAt: string,
  updateAt: string,
  commentsIds: CommentAttributes[],
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
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id'
  })
  authorId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  content: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  createAt: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  updateAt: string;

  @ForeignKey(() => Comment)
  @AllowNull(false)
  @Column({
    type: DataType.ARRAY(DataType.STRING),
    field: 'id',
  })
  commentsIds: string[];
}