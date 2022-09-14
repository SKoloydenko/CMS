import bcrypt from "bcryptjs";
import ApiError from "../exceptions/api.error";
import User from "../models/user.model";

class UserService {
  async findUser(id: number) {
    const user = await User.findByPk(id);
    if (!user) {
      throw ApiError.NotFound("Пользователь не найден");
    }
    return user;
  }

  async verifyCredentials(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.NotFound(`Пользователь с email ${email} не найден`);
    }

    const equalPasswords = bcrypt.compareSync(password, user.password);
    if (!equalPasswords) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    return user;
  }
}

export default new UserService();
