import { JSONSchemaType } from "ajv";
import { LoginRequest } from "../interfaces/auth";

const loginRequestSchema: JSONSchemaType<LoginRequest> = {
  type: "object",
  properties: {
    email: { type: "string", format: "email", minLength: 1, maxLength: 200 },
    password: { type: "string", minLength: 8, maxLength: 31 },
  },
  required: ["email", "password"],
  additionalProperties: false,
  errorMessage: {
    type: "Требуется формат JSON",
    additionalProperties: "Не должно быть лишних полей",
    properties: {
      email:
        "Email должен быть действительным адресом электронной почты, строкой максимальной длины 200 символов",
      password:
        "Пароль должен быть строкой минимальной длины 8 символов и максимальной длины 31 символ",
    },
    required: {
      email: "Должен присутствовать email",
      password: "Должен присутствовать пароль",
    },
  },
};

export default loginRequestSchema;
