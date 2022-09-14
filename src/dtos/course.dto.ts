import {
  CoursePreviewResponse,
  CourseResponse,
  UserCourseResponse,
} from "../interfaces/course";
import Course from "../models/course.model";
import User from "../models/user.model";
import { UserResponseDTO } from "./user.dto";

export function CoursePreviewResponseDTO(
  course: Course
): CoursePreviewResponse {
  return {
    title: course.title,
    startingDate: course.startingDate,
    finishingDate: course.finishingDate,
  };
}

export function CourseResponseDTO(course: Course): CourseResponse {
  return {
    title: course.title,
    description: course.description,
    startingDate: course.startingDate,
    finishingDate: course.finishingDate,
  };
}

export function UserCourseResponseDTO(
  enrolled: User[],
  unenrolled: User[]
): UserCourseResponse {
  return {
    enrolled: enrolled.map((user) => UserResponseDTO(user)),
    unenrolled: unenrolled.map((user) => UserResponseDTO(user)),
  };
}
