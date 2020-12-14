import express from "express";
import UserController from "../controllers/auth";

// eslint-disable-next-line object-curly-newline
const {
  verifyEmail,
  resendEmailConfirm,
} = UserController;
const router = express.Router();

router.get("/verify-email/:token", verifyEmail);
router.post("/resend-confirm", resendEmailConfirm);

export default router;
