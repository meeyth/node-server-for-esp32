// routes/parkinglot.routes.js
import express from "express";
import {

  getAllParkingLots,
} from "../controllers/parkinglot.controllers.js";

const router = express.Router();

router.get("/", getAllParkingLots);

export default router;
