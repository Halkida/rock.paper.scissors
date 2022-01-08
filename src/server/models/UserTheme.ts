import {
  Model,
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  DataType,
  AllowNull,
  ForeignKey,
  Unique
} from 'sequelize-typescript';
import { SiteTheme } from './SiteTheme'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme'
})
export class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => SiteTheme)
  @Unique
  @AllowNull(false)
  @Column({
    field: 'theme_id'
  })
  themeId: number;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id'
  })
  ownerId: number;
}