import express from "express";
import inventoryController from "../controllers/inventory";
import upload from "../middlewares/upload-excel";
import Authentication from "../middlewares/authentication";

const { verifyToken } = Authentication;

const { uploadInventory, addInventory, getInventory } = inventoryController;
const router = express.Router();

router.post("/inventory/excel", upload.single("file"), uploadInventory);
router.post("/inventory", verifyToken, addInventory);
router.get("/inventory", getInventory);

export default router;
