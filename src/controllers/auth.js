/* eslint-disable camelcase */
import bcrypt from "bcryptjs";
import userServices from "../services/user";
import jwtHelper from "../helpers/jwt";
import bcryptHelper from "../helpers/bcrypt";
import User from "../models/user";
import PharmacyProfile from "../models/pharmacy_profile";
import { registrationValidation } from "../validations/authValidation";
import mail from "../services/sendgrid";
import utils from "../helpers/utils";
import { emailConfirmationTemplate } from "../views/template";
import { passwordResetTemplate } from "../views/forgetpassword";

const mongoose = require("mongoose");

const { emailVerificationLink, forgetPasswordLink } = utils;
const { hashedPassword } = bcryptHelper;
const { verifyToken } = jwtHelper;

export default class Auth {
  static async createUser(req, res) {
    try {
      const {
        username,
        email,
        phone_number,
        password,
        verify_password,
      } = req.body;

      const { error } = registrationValidation(req.body);
      if (error) {
        return res.status(400).json({
          status: 400,
          message: "Validation error",
          error: error.message,
        });
      }
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({
          status: 409,
          error: "This username is associated with another account.",
        });
      }
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(409).json({
          status: 409,
          error: "This email is associated with another account.",
        });
      }
      const existingNumber = await User.findOne({ phone_number });
      if (existingNumber) {
        return res.status(409).json({
          status: 409,
          error: "This phone number is associated with another account.",
        });
      }
      if (verify_password !== password) {
        return res.status(400).json({
          status: 400,
          error: "Passwords do not match.",
        });
      }
      const hashPassword = bcrypt.hashSync(password, 12);
      const user = {
        username,
        email,
        phone_number,
        password: hashPassword,
      };
      const newUser = await userServices.addUser(user);
      await new PharmacyProfile({
        user_id: newUser._id,
        company_name: newUser.username,
        company_email: newUser.email,
        company_phone_number: newUser.phone_number
      }).save()
      const token = await jwtHelper.generateToken(newUser);
      await mail({
        to: newUser.email,
        from: "PharmaFind <francisabonyi@gmail.com>",
        subject: "Welcome to PharmaFind!",
        html: emailConfirmationTemplate(
          newUser.username,
          emailVerificationLink(token)
        ),
      });

      return res.status(201).json({
        status: 201,
        token,
        message: `Registration successful. Hello, ${newUser.username}! Please verify your email.`,
      });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({
          status: 404,
          error: "This email is not associated with any account.",
        });
      }
      if (!existingUser.email_verified) {
        return res.status(400).json({
          status: 400,
          error: "User email not verified.",
        });
      }
      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!validPassword) {
        return res.status(401).json({
          status: 401,
          error: "Incorrect password!",
        });
      }

      const token = await jwtHelper.generateToken(existingUser);
      return res.status(200).json({ status: 200, message: `Hello ${existingUser.username}, welcome!`, token });
    } catch (error) {
      res.status(500).json({ status: 500, error: "Server Error" });
    }
  }

  static async verifyEmail(req, res) {
    const { token } = req.params;
    try {
      const payload = await jwtHelper.decodeToken(token);
      const verifyUser = await User.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(payload.id) }, { email_verified: true }, { new: true }
      );
      if (!verifyUser) {
        return res
          .status(400)
          .json({ status: 400, message: "Account no longer exists" });
      }
      return res
        .status(200)
        .json({ status: 200, message: "User successfully verified!" });
    } catch (error) {
      res.status(500).json({ status: 500, error: "Server Error" });
    }
  }

  static async forgetPassword(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: `The email address ${req.body.email} is not associated with any account. Double-check your email address and try again.`,
        });
      }
      const token = await jwtHelper.generateToken(user, user.password);
      const link = forgetPasswordLink(user._id, token);

      await mail({
        to: email,
        from: "PharmaFind <francisabonyi@gmail.com>",
        subject: "Password reset!!",
        html: passwordResetTemplate(user.username, link),
      });
      res.status(200).json({
        message: `A reset email has been sent to ${user.email}.`,
      });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }

  static async resendEmailConfirm(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: `The email address ${req.body.email} is not associated with any account. Double-check your email address and try again.`,
        });
      }

      const token = await jwtHelper.generateToken(user.id);
      await mail({
        to: user.email,
        from: "PharmaFind <francisabonyi@gmail.com>",
        subject: "Welcome to PharmaFind!",
        html: emailConfirmationTemplate(
          user.username,
          emailVerificationLink(token)
        ),
      });
      return res.status(200).json({
        message: `Confirm your email on the link sent to ${email}`,
      });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }

  static async passwordReset(req, res) {
    try {
      const { token, id } = req.params;
      const { password } = req.body;

      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(401).json({
          message: `The email address ${req.body.email} is not associated with any account. Double-check your email address and try again.`,
        });
      }

      verifyToken(token);
      user.password = hashedPassword(password);
      await user.save();
      return res.status(200).json({
        message: "Password Changed!! Login Now",
      });
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }
}
