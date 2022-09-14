import { Request } from "express";
import courseService from "../services/course.service";

export const CourseExistsMiddleware = async (
  req: Request<{ courseId: number }>,
  _,
  next
) => {
  try {
    const { courseId } = req.params;

    await courseService.findCourse(courseId);
    return next();
  } catch (e) {
    return next(e);
  }
};
