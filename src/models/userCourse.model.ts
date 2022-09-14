import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Course from "./course.model";
import User from "./user.model";

@Table({
  timestamps: false,
  underscored: true,
})
export default class UserCourse extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Course)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  courseId!: number;
}
