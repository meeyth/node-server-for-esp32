import express from "express";
import { 
    createWasteBatch, 
    getAllWasteBatches, 
    getWasteBatchById 
} from "../controllers/wasteBatch.controllers.js";

const router = express.Router();

// Routes
router.post("/", createWasteBatch);
router.get("/", getAllWasteBatches);
router.get("/:batch_id", getWasteBatchById);

export default router;
