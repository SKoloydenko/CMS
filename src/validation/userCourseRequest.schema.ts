import { JSONSchemaType } from "ajv";
import { UserCourseRequest } from "../interfaces/course";

const userCourseRequestElementSchema: JSONSchemaType<{ id: number }> = {
  type: "object",
  properties: {
    id: { type: "number" },
  },
  required: ["id"],
  additionalProperties: false,
  errorMessage: {
    type: "Требуется формат JSON",
    additionalProperties: "Не должно быть лишних полей",
    properties: {
      id: "Идентификатор пользователя должен быть числом",
    },
    required: {
      users: "Должен присутствовать идентификатор пользователя",
    },
  },
};

const userCourseRequestSchema: JSONSchemaType<UserCourseRequest> = {
  type: "object",
  properties: {
    users: { type: "array", items: userCourseRequestElementSchema },
  },
  required: ["users"],
  additionalProperties: false,
  errorMessage: {
    type: "Требуется формат JSON",
    additionalProperties: "Не должно быть лишних полей",
    properties: {
      users: "Массив пользователей должен быть действительным",
    },
    required: {
      users: "Должен присутствовать массив пользователей",
    },
  },
};

export default userCourseRequestSchema;
