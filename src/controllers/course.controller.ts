import { NextFunction, Request, Response } from "express";
import { CourseRequest, UserCourseRequest } from "../interfaces/course";
import courseService from "../services/course.service";
import courseRequestSchema from "../validation/courseRequest.schema";
import userCourseRequestSchema from "../validation/userCourseRequest.schema";
import validate from "../validation/validator";

class CourseController {
  async getCourses(_: Request, res: Response, next: NextFunction) {
    try {
      const courses = await courseService.getCourses();
      return res.json(courses);
    } catch (e) {
      next(e);
    }
  }

  async getCourse(
    req: Request<{ courseId: number }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { courseId } = req.params;

      const courses = await courseService.getCourse(courseId);
      return res.json(courses);
    } catch (e) {
      next(e);
    }
  }

  async createCourse(
    req: Request<{}, CourseRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const courseDTO = validate<CourseRequest>(courseRequestSchema, req.body);

      const course = await courseService.createCourse(courseDTO);
      return res.status(201).json({ message: "Курс создан", data: course });
    } catch (e) {
      next(e);
    }
  }

  async updateCourse(
    req: Request<{ courseId: number }, CourseRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { courseId } = req.params;
      const courseDTO = validate<CourseRequest>(courseRequestSchema, req.body);

      const course = await courseService.updateCourse(courseId, courseDTO);
      return res.json({ message: "Курс обновлен", data: course });
    } catch (e) {
      next(e);
    }
  }

  async deleteCourse(
    req: Request<{ courseId: number }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { courseId } = req.params;

      await courseService.deleteCourse(courseId);
      return res.json({ message: "Курс удален" });
    } catch (e) {
      next(e);
    }
  }

  async getUserCourses(
    req: Request<{ courseId: number }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user;
      const { courseId } = req.params;

      const users = await courseService.getCourseUsers(courseId, id);
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async createCourseUsers(
    req: Request<{ courseId: number }, UserCourseRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user;
      const { courseId } = req.params;
      const usersDTO = validate<UserCourseRequest>(
        userCourseRequestSchema,
        req.body
      );

      const users = await courseService.createCourseUsers(courseId, usersDTO);
      return res.json({
        message: "Пользователи добавлены на курс",
        data: users,
      });
    } catch (e) {
      next(e);
    }
  }

  async deleteCourseUsers(
    req: Request<{ courseId: number }, UserCourseRequest>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user;
      const { courseId } = req.params;
      const usersDTO = validate<UserCourseRequest>(
        userCourseRequestSchema,
        req.body
      );

      const users = await courseService.deleteCourseUsers(courseId, usersDTO);
      return res.json({ message: "Пользователи удалены с курса", data: users });
    } catch (e) {
      next(e);
    }
  }
}

export default new CourseController();
