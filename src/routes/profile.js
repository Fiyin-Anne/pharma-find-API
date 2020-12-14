import express from "express";
import pharmaProfile from "../controllers/profile";
import Authentication from "../middlewares/authentication";

const { verifyToken } = Authentication;
const { editProfile, getProfile } = pharmaProfile;
const router = express.Router();

router.patch("/update", verifyToken, editProfile);
router.get("/profile", getProfile);

export default router;
