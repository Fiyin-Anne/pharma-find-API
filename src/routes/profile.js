import express from "express";
import pharmaProfile from "../controllers/profile";
import upload from "../middlewares/upload-photo";
import Authentication from "../middlewares/authentication";

const { verifyToken, verifyrole } = Authentication;
const { editProfile, getProfile } = pharmaProfile;
const router = express.Router();

router.put("/update", verifyToken, verifyrole ,upload.single("image"), editProfile);
router.get("/profile", getProfile);

export default router;
