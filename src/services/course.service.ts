import { Identifier, Includeable, Op } from "sequelize";
import {
  CoursePreviewResponseDTO,
  CourseResponseDTO,
  UserCourseResponseDTO,
} from "../dtos/course.dto";
import ApiError from "../exceptions/api.error";
import { CourseRequest, UserCourseRequest } from "../interfaces/course";
import Course from "../models/course.model";
import User from "../models/user.model";
import UserCourse from "../models/userCourse.model";

class CourseService {
  async findCourse(
    courseId: Identifier | undefined,
    include?: Includeable | Includeable[] | undefined
  ) {
    const course = await Course.findByPk(courseId, {
      include,
    });
    if (!course) {
      throw ApiError.NotFound(`Курс с id ${courseId} не найден`);
    }
    return course;
  }

  async findUserCourse(
    courseId: Identifier | undefined,
    userId: Identifier | undefined,
    include?: Includeable | Includeable[] | undefined
  ) {
    const userCourse = await UserCourse.findOne({
      where: {
        courseId,
        userId,
      },
      include,
    });
    if (!userCourse) {
      throw ApiError.NotFound(
        `Пользователь с id ${userId} не является участником курса с id ${courseId}`
      );
    }
    return userCourse;
  }

  async getCourses() {
    const courses = await Course.findAll();
    return courses.map((course) => CoursePreviewResponseDTO(course));
  }

  async getCourse(courseId: number) {
    const course = await this.findCourse(courseId);
    return CourseResponseDTO(course);
  }

  async createCourse(courseDTO: CourseRequest) {
    const candidate = await Course.findOne({
      where: { title: courseDTO.title },
    });
    if (candidate) {
      throw ApiError.BadRequest(
        `Курс с названием ${courseDTO.title} уже существует`
      );
    }

    const course = await Course.create({
      title: courseDTO.title,
      description: courseDTO.description,
      startingDate: courseDTO.startingDate,
      finishingDate: courseDTO.finishingDate,
    });
    return CourseResponseDTO(course);
  }

  async updateCourse(courseId: number, courseDTO: CourseRequest) {
    const course = await this.findCourse(courseId);
    const candidate = await Course.findOne({
      where: { title: courseDTO.title },
    });
    if (candidate) {
      `Курс с названием ${courseDTO.title} уже существует`;
    }

    course.title = courseDTO.title;
    course.description = courseDTO.description;
    course.startingDate = courseDTO.startingDate;
    course.finishingDate = courseDTO.finishingDate;

    const updatedCourse = await course.save();
    return CourseResponseDTO(updatedCourse);
  }

  async deleteCourse(courseId: number) {
    const course = await this.findCourse(courseId);
    await course.destroy();
  }

  async getCourseUsers(courseId: number, userId: number) {
    const userCourses = await UserCourse.findAll({
      where: {
        courseId,
      },
      include: User,
    });
    const enrolled = userCourses.map((userCourse) => userCourse.user);
    const users = await User.findAll({
      where: {
        id: { [Op.not]: userId },
      },
    });
    const unenrolled = users.filter(
      (user) => !enrolled.find((enrolled) => user.id === enrolled.id)
    );
    return UserCourseResponseDTO(enrolled, unenrolled);
  }

  async createCourseUsers(courseId: number, usersDTO: UserCourseRequest) {
    const users = await Promise.all(
      usersDTO.users.map(async (user) => {
        const userCourse = await UserCourse.findOne({
          where: {
            courseId,
            userId: user.id,
          },
        });
        if (userCourse) {
          throw ApiError.BadRequest(
            "Пользователь уже является участником курса"
          );
        }
        await UserCourse.create({
          courseId,
          userId: user.id,
        });
        return { id: user.id };
      })
    );
    return { users };
  }

  async deleteCourseUsers(courseId: number, usersDTO: UserCourseRequest) {
    const users = await Promise.all(
      usersDTO.users.map(async (user) => {
        const userCourse = await UserCourse.findOne({
          where: {
            courseId,
            userId: user.id,
          },
        });
        if (!userCourse) {
          throw ApiError.NotFound("Пользователь не является участником курса");
        }
        await userCourse.destroy();
        return { id: user.id };
      })
    );
    return { users };
  }
}

export default new CourseService();
