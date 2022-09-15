import { UserResponse } from "./user";

export interface CourseRequest {
  title: string;
  description: string;
  startingDate: string;
  finishingDate: string;
}

export interface CoursePreviewResponse {
  id: number;
  title: string;
  startingDate: string;
  finishingDate: string;
}

export interface CourseResponse {
  id: number;
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
