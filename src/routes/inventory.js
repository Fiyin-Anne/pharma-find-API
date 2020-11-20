import express from "express";
import inventoryController from "../controllers/inventory";
import upload from "../middlewares/upload-excel";

const { uploadInventory, getInventory } = inventoryController;
const router = express.Router();

router.post("/inventory/excel", upload.single("file"), uploadInventory);
router.get("/inventory", getInventory);

export default router;
