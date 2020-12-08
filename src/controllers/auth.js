/* eslint-disable camelcase */
import bcrypt from "bcryptjs";
import userServices from "../services/user";
import jwtHelper from "../helpers/jwt";
import User from "../models/user";
import { registrationValidation } from "../validations/authValidation";
import mail from "../services/sendgrid";
import utils from "../helpers/utils";
import { emailConfirmationTemplate } from "../views/template";

const mongoose = require("mongoose");

const { emailVerificationLink } = utils;

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

      const { error } = registrationValidation(req.body);
      if (error) return res.status(400).json({ status: 400, message: "Validation error", error: error.message });
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({
          status: 409,
          error: "This username is associated with another account."
        });
      }
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(409).json({
          status: 409,
          error: "This email is associated with another account."
        });
      }
      const existingNumber = await User.findOne({ phone_number });
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
      const token = await jwtHelper.generateToken(newUser.id);
      await mail({
        to: newUser.email,
        from: "PharmaFind <francisabonyi@gmail.com>",
        subject: "Welcome to PharmaFind!",
        html: emailConfirmationTemplate(newUser.username, emailVerificationLink(token))
      });

      return res.status(201).json({ status: 201, token, message: `Registration successful. Hello, ${newUser.username}! Please verify your email.`, });
    } catch (error) {
      res.status(500).json({ status: 500, error: "Server Error" });
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({
          status: 404,
          error: "This email is not associated with any account."
        });
      }
      if (!existingUser.email_verified) {
        return res.status(400).json({
          status: 400,
          error: "User email not verified."
        });
      }
      const validPassword = await bcrypt.compare(password, existingUser.password);
      if (!validPassword) {
        return res.status(401).json({
          status: 401,
          error: "Incorrect password!"
        });
      }
      const token = await jwtHelper.generateToken(existingUser);
      return res.status(200).json({ status: 200, message: `Hello ${existingUser.username}, welcome!`, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, error: "Server Error" });
    }
  }

  static async verifyEmail(req, res) {
    const { token } = req.params;
    try {
      const payload = await jwtHelper.decodeToken(token);
      console.log(token);
      const verifyUser = await User.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(payload) }, { email_verified: true }, { new: true }
      );
      if (!verifyUser) return res.status(400).json({ status: 400, message: "Account no longer exists" });
      return res.status(200).json({ status: 200, message: "User successfully verified!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 500, error: "Server Error" });
    }
  }
}
