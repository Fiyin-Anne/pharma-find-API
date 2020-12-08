import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey = process.env.JWT_KEY;

export default class jwtHelper {
  static async generateToken(payload, secret = secretKey) {
    const token = await jwt.sign({ payload }, secret, { expiresIn: "24h" });
    return token;
  }

  static async decodeToken(token) {
    const decoded = await jwt.decode(token);
    return decoded.payload;
  }

  static async verifyToken(token) {
    const verifyToken = await jwt.verify(token, secretKey);
    return verifyToken;
  }
}
