import express from "express";
import { createSensor, getAllSensors, getSensorById } from "../controllers/sensors.controllers.js";

const router = express.Router();

router.post("/", createSensor);
router.get("/", getAllSensors);
router.get("/:sensor_id", getSensorById);

export default router;
