import express from "express";
import UserController from "../controllers/auth";
import Authentication from "../middlewares/authentication";

const { verifyToken } = Authentication;

// eslint-disable-next-line object-curly-newline
const {
  createUser,
  userLogin,
  forgetPassword,
  resendEmailConfirm,
  verifyEmail,
  passwordReset,
  logout,
} = UserController;
const router = express.Router();

router.post("/register", createUser);
router.post("/login", userLogin);
router.get("/logout", verifyToken, logout);
router.get("/verify-email/:token", verifyEmail);
router.post("/forget-password", forgetPassword);
router.post("/resend-confirm", resendEmailConfirm);
router.post("/reset/:id-:token", passwordReset);

export default router;
