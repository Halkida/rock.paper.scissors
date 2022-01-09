import {
  Model,
  Table,
  Column,
  AutoIncrement,
  PrimaryKey,
  DataType,
  AllowNull,
  Unique,
  Index
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'site_theme'
})
export class SiteTheme extends Model<SiteTheme> {
  @AutoIncrement
  @PrimaryKey
  @Unique
  @Column(DataType.INTEGER)
  id: number;

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  theme: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  description: string;
}