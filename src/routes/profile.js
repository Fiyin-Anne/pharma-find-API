import express from "express";
import pharmaProfile from "../controllers/profile";
import upload from "../middlewares/upload-photo";

const { editProfile, getProfile } = pharmaProfile;
const router = express.Router();

router.put("/edit/:id", upload.single("image"), editProfile);
router.get("/profile", getProfile);

export default router;
