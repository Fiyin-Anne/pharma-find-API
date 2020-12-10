import express from "express";
import galleryController from "../controllers/gallery";
import upload from "../middlewares/upload-photo";

const { uploadImage, getImages, getSingleImage } = galleryController;
const router = express.Router();

router.post("/image", upload.single("image"), uploadImage);
router.get("/image/:id", getSingleImage);
router.get("/image", getImages);

export default router;
