/* eslint-disable camelcase */
import bcrypt from "bcryptjs";
import userServices from "../services/user";
import User from "../models/user";

export default class Auth {
  static async createUser(req, res) {
    try {
      const {
        username,
        email,
        phone_number,
        password,
        verify_password
      } = req.body;

      const existingUser = await userServices.checkUser("username", username);
      if (existingUser) {
        return res.status(409).json({
          status: 409,
          error: "This username is associated with another account."
        });
      }
      const existingEmail = await userServices.checkUser("email", email);
      if (existingEmail) {
        return res.status(409).json({
          status: 409,
          error: "This email is associated with another account."
        });
      }
      const existingNumber = await userServices.checkUser("phone_number", phone_number);
      if (existingNumber) {
        return res.status(409).json({
          status: 409,
          error: "This phone number is associated with another account."
        });
      }
      if (verify_password !== password) {
        return res.status(400).json({
          status: 400,
          error: "Passwords do not match."
        });
      }
      const hashPassword = bcrypt.hashSync(password, 12);
      const user = {
        username,
        email,
        phone_number,
        password: hashPassword
      };
      const newUser = await userServices.addUser(user);
      return res.status(201).json({ status: 201, message: `Registration successful. Hello, ${newUser.username}!`, });
    } catch (error) {
      res.status(500).json({ status: 500, error: "Server Error" });
    }
  }
}
