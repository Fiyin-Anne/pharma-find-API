import express from "express";
import UserController from "../controllers/auth";

const { createUser, userLogin } = UserController;
const router = express.Router();

router.post("/register", createUser);
router.post("/login", userLogin);
module.exports = router;
