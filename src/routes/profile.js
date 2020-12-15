import express from "express";
import pharmaProfile from "../controllers/profile";
import Authentication from "../middlewares/authentication";

const { verifyToken } = Authentication;
const { editProfile, getProfile, updatePharmaProfile } = pharmaProfile;
const router = express.Router();

router.patch("/update", verifyToken, editProfile);
router.patch("/update/profile", verifyToken, updatePharmaProfile);
router.get("/profile", getProfile);

export default router;
