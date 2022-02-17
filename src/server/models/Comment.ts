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
import { Topic } from './Topic';

export type CommentAttributes = {
  id: number,
  authorId: number,
  content: string,
  createAt: string,
  updateAt: string,
  replyTo?: number,
  topicId: number,
}

type CommentCreationAttributes = Omit<CommentAttributes, 'id' | 'createAt' | 'updateAt'>;

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'rps_comment'
})

export class Comment extends Model<CommentAttributes, CommentCreationAttributes> {
  @AutoIncrement
  @Unique
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'author_id'
  })
  authorId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  content: string;

  @ForeignKey(() => Comment)
  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
    field: 'reply_to'
  })
  replyTo: number;

  @ForeignKey(() => Topic)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'topic_id'
  })
  topicId: number;
}