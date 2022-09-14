import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
  Unique,
} from "sequelize-typescript";
import Course from "./course.model";
import UserCourse from "./userCourse.model";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

@Table({
  timestamps: true,
  underscored: true,
  createdAt: "registeredAt",
})
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Unique(true)
  @AllowNull(false)
  @Column(DataType.STRING(200))
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING(256))
  password!: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  surname!: string;

  @Column(DataType.STRING(100))
  patronymic!: string | null;

  @Default(UserRole.USER)
  @AllowNull(false)
  @Column(DataType.ENUM(UserRole.USER, UserRole.ADMIN))
  role!: UserRole;

  @Default(Sequelize.fn("now"))
  @Column(DataType.DATE)
  registeredAt!: string;

  @Column(DataType.DATE)
  updatedAt!: string;

  @BelongsToMany(() => Course, () => UserCourse)
  courses!: Course[];
}
