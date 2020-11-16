import express from "express";
import UserController from "../controllers/auth";

const { createUser } = UserController;
const router = express.Router();

router.post("/register", createUser);

module.exports = router;
