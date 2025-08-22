import express from "express";
import {
  createGasReading,
  getGasReadings,
  getGasReadingById,
} from "../controllers/gasreadings.controllers.js";

const router = express.Router();

router.post("/", createGasReading);
router.get("/", getGasReadings);
router.get("/:id", getGasReadingById);

export default router;

