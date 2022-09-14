import { UserResponse } from "./user";

export interface CourseRequest {
  title: string;
  description: string;
  startingDate: string;
  finishingDate: string;
}

export interface CoursePreviewResponse {
  title: string;
  startingDate: string;
  finishingDate: string;
}

export interface CourseResponse {
  title: string;
  description: string;
  startingDate: string;
  finishingDate: string;
}

export interface UserCourseRequest {
  users: { id: number }[];
}

export interface UserCourseResponse {
  enrolled: UserResponse[];
  unenrolled: UserResponse[];
}
