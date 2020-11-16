import User from "../models/user";

export default class Auth {
  static async checkId(id) {
    try {
      return await User.findById(id);
    } catch (err) {
      throw err;
    }
  }

  static async checkUser(column = "email", value) {
    try {
      return await User.findOne({ column: value });
    } catch (err) {
      throw err;
    }
  }

  static async addUser(user) {
    try {
      return await new User(user).save();
    } catch (err) {
      throw err;
    }
  }
}
