import express from "express";
import UserController from "../controllers/auth";

// eslint-disable-next-line object-curly-newline
const {
  createUser,
  userLogin,
  verifyEmail,
  forgetPassword,
  resendEmailConfirm,
  passwordReset,
} = UserController;
const router = express.Router();

router.post("/register", createUser);
router.post("/login", userLogin);
router.get("/verify-email/:token", verifyEmail);
router.post("/forget-password", forgetPassword);
router.post("/resend-confirm", resendEmailConfirm);
router.post("/reset/:id-:token", passwordReset);

module.exports = router;
