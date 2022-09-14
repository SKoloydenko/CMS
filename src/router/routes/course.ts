import { Router } from "express";
import courseController from "../../controllers/course.controller";
import { AdminMiddleware } from "../../middlewares/admin.middleware";
import { AuthenticationMiddleware } from "../../middlewares/authentication.middleware";
import { CourseExistsMiddleware } from "../../middlewares/courseExists.middleware";

const router = Router();

router.use(AuthenticationMiddleware, AdminMiddleware);

router.get("/", courseController.getCourses);
router.get("/:courseId", courseController.getCourse);
router.post("/", courseController.createCourse);
router.put("/:courseId", courseController.updateCourse);
router.delete("/:courseId", courseController.deleteCourse);

router.get(
  "/:courseId/users",
  CourseExistsMiddleware,
  courseController.getUserCourses
);
router.post(
  "/:courseId/users",
  CourseExistsMiddleware,
  courseController.createCourseUsers
);
router.delete(
  "/:courseId/users",
  CourseExistsMiddleware,
  courseController.deleteCourseUsers
);

export default router;
