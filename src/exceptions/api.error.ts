export default class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors: any[] = []
  ) {
    super(message);
  }

  static Unauthorized() {
    return new ApiError(401, "Пользователь не авторизован");
  }

  static Forbidden(message?) {
    return new ApiError(403, message ?? "Недостаточно прав");
  }

  static BadRequest(message, errors: any[] = []) {
    return new ApiError(400, message, errors);
  }

  static NotFound(message, errors: any[] = []) {
    return new ApiError(404, message, errors);
  }

  static UnsupportedMediaType(message, errors = []) {
    return new ApiError(415, message, errors);
  }

  static PayloadTooLarge(message, errors = []) {
    return new ApiError(413, message, errors);
  }

  static Conflict(message, errors = []) {
    return new ApiError(409, message, errors);
  }
}
