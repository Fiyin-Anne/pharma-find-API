import express from "express";
import UserController from "../controllers/auth";

const { createUser, userLogin, verifyEmail } = UserController;
const router = express.Router();

router.post("/register", createUser);
router.post("/login", userLogin);
router.get("/verify-email/:token", verifyEmail);
module.exports = router;
