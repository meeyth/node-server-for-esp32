import express from "express";
import {
    createComposition,
    getAllCompositions,
    getCompositionsByBatch,
    getCompositionById
} from "../controllers/composition.controllers.js";

const router = express.Router();

// Routes
router.post("/", createComposition);
router.get("/", getAllCompositions);
router.get("/batch/:batch_id", getCompositionsByBatch);
router.get("/:composition_id", getCompositionById);

export default router;
