import express from "express";
import { calculateEmissionbyentrance, getEmissionbyentrance } from "../controllers/emission.controllers.js";

const router = express.Router();

    // Route to calculate emission 
// router.post("/calculate", calculateEmission);
    // Route to calculate emission by entrance
router.post("/calculate/entrance", calculateEmissionbyentrance);

router.post("/get/entrance", getEmissionbyentrance);


export default router;

