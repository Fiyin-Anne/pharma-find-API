import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";

dotenv.config();
export default class Authentication {
  static async verifyToken(req, res, next) {
    try {
      const { authorization } = req.headers;
      let decoded;
      if (authorization) {
        try {
          decoded = jwt.verify(authorization, process.env.JWT_KEY);
        } catch (error) {
          return res
            .status(410)
            .send({ status: 410, error: "Please sign in again." });
        }
        req.decoded = decoded;
        return next();
      }
      return res.status(401).json({ status: 401, error: "Please login." });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }

  static async verifyrole(req, res, next) {
    try {
      const { role } = req.decoded;
      if (role === "Pharmacy Admin") {
        return next();
      }
      return res.status(403).json({ status: 403, error: "Access denied." });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
}
