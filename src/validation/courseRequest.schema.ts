import { JSONSchemaType } from "ajv";
import { CourseRequest } from "../interfaces/course";

const courseRequestSchema: JSONSchemaType<CourseRequest> = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 1, maxLength: 200 },
    description: { type: "string", minLength: 1, maxLength: 500 },
    startingDate: { type: "string", format: "date" },
    finishingDate: { type: "string", format: "date" },
  },
  required: ["title", "description", "startingDate", "finishingDate"],
  additionalProperties: false,
  errorMessage: {
    type: "Требуется формат JSON",
    additionalProperties: "Не должно быть лишних полей",
    properties: {
      title:
        "Название курса должно быть строкой максимальной длины 200 символов",
      description:
        "Описание курса должно быть строкой максимальной длины 500 символов",
      startingDate: "Дата начала курса должна быть действительной датой",
      finishingDate: "Дата конца курса должна быть действительной датой",
    },
    required: {
      title: "Должно присутствовать название курса",
      description: "Должно присутствовать описание курса",
      startingDate: "Должна присутствовать дата начала курса",
      finishingDate: "Должна присутствовать дата конца курса",
    },
  },
};

export default courseRequestSchema;
