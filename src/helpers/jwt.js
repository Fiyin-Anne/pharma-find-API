import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey = process.env.JWT_KEY;

export default class jwtHelper {
  static async generateToken({ id, role }, secret = secretKey) {
    const token = await jwt.sign({ id, role }, secret, { expiresIn: "24h" });
    return token;
  }

  static async decodeToken(token) {
    const decoded = await jwt.decode(token);
    return decoded;
  }
}
