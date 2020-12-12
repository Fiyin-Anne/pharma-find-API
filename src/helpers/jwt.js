import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey = process.env.JWT_KEY;

export default class jwtHelper {
  static async generateToken({_id, role} , secret = secretKey) {
    try {
      
    const token = await jwt.sign({_id, role} , secret, { expiresIn: "24h" });
    return token;
    } catch(error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }

  static async decodeToken(token) {
    const decoded = await jwt.decode(token);
    return decoded;
  }

  static async verifyToken(token) {
    const verifyToken = await jwt.verify(token, secretKey);
    return verifyToken;
  }
}
