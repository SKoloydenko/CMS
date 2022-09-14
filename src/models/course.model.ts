import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import User from "./user.model";
import UserCourse from "./userCourse.model";

@Table({
  timestamps: false,
  underscored: true,
})
export default class Course extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Unique(true)
  @AllowNull(false)
  @Column(DataType.STRING(200))
  title!: string;

  @AllowNull(false)
  @Column(DataType.STRING(500))
  description!: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  startingDate!: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  finishingDate!: string;

  @BelongsToMany(() => User, () => UserCourse)
  members!: User[];
}
