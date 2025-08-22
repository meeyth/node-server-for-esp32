import express from "express";
import {
    createSite,
    getAllSites,
    getSiteById,
    updateSite,
    deleteSite,
    getSitesByType,
    getSitesByOperator,
    getSitesCommissionedAfter,
    getSitesByName
} from "../controllers/site.controllers.js";

const router = express.Router();

router.post("/", createSite);
router.get("/", getAllSites);
router.get("/:site_id", getSiteById);
router.put("/:site_id", updateSite);
router.delete("/:site_id", deleteSite);
router.get("/type/:type", getSitesByType);
router.get("/operator/:operator", getSitesByOperator);
router.get("/commissioned-after/:date", getSitesCommissionedAfter);
router.get("/name/:name", getSitesByName);

export default router;
