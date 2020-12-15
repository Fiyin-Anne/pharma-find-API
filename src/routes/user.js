import express from "express";
import UserController from "../controllers/auth";

// eslint-disable-next-line object-curly-newline
const {
  createUser,
  userLogin,
  forgetPassword,
  resendEmailConfirm,
  verifyEmail,
  passwordReset,
} = UserController;
const router = express.Router();

router.post("/register", createUser);
router.post("/login", userLogin);
router.get("/verify-email/:token", verifyEmail);
router.post("/forget-password", forgetPassword);
router.post("/resend-confirm", resendEmailConfirm);
router.post("/reset/:id-:token", passwordReset);

export default router;
