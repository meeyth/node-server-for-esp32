import express from "express";
import {  getSiteMethaneFromBatches } from "../controllers/dashboard.controller.js";

const router = express.Router();

// GET total methane for a site in last 24 hrs
//router.get("/site/:site_id/methane/24hrs", getSiteMethane24Hrs);

//router.get("/site/:site_id/methane-prev-24h", getSiteMethaneFromBatches);

// GET methane readings for a site using sensors and waste batches
router.get("/site/:site_id/methane-from-batches", getSiteMethaneFromBatches);
export default router;
