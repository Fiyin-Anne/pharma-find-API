import bcrypt from "bcryptjs";

export default class brcryptHelper {
  static hashedPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
  }
}
