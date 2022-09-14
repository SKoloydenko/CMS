import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import addFormats from "ajv-formats";
import ApiError from "../exceptions/api.error";

const ajv = new Ajv({ allErrors: true, $data: true });

addFormats(ajv);
ajvErrors(ajv);

export default function validate<T>(schema: object, data: T): T {
  const isValid = ajv.validate(schema, data);
  if (!isValid) {
    throw ApiError.BadRequest(
      "Ошибка валидации",
      ajv.errors?.map((error) => error.message)
    );
  }
  return data;
}
