import Site from "../models/site.models.js";

// Create a new site
export const createSite = async (req, res) => {
    const { site_id, name, type, address, latitude, longitude, operator, commissioned_on } = req.body;
    if (!site_id || !name) {
        return res.status(400).json({ success: false, message: "site_id and name are required" });
    }
    try {
        const newSite = new Site({ site_id, name, type, address, latitude, longitude, operator, commissioned_on });
        await newSite.save();
        res.status(201).json({ success: true, data: newSite });
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ success: false, message: "Site ID already exists" });
        } else {
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }
};

// Get all sites
export const getAllSites = async (req, res) => {
    try {
        const sites = await Site.find();
        res.json({ success: true, data: sites });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get site by site_id
export const getSiteById = async (req, res) => {
    try {
        const site = await Site.findOne({ site_id: req.params.site_id });
        if (!site) return res.status(404).json({ success: false, message: "Site not found" });
        res.json({ success: true, data: site });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Update a site
export const updateSite = async (req, res) => {
    const { name, type, address, latitude, longitude, operator, commissioned_on } = req.body;
    try {
        const updatedSite = await Site.findOneAndUpdate(
            { site_id: req.params.site_id },
            { name, type, address, latitude, longitude, operator, commissioned_on },
            { new: true }
        );
        if (!updatedSite) return res.status(404).json({ success: false, message: "Site not found" });
        res.json({ success: true, data: updatedSite });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Delete a site
export const deleteSite = async (req, res) => {
    try {
        const deletedSite = await Site.findOneAndDelete({ site_id: req.params.site_id });
        if (!deletedSite) return res.status(404).json({ success: false, message: "Site not found" });
        res.json({ success: true, message: "Site deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get sites by type
export const getSitesByType = async (req, res) => {
    try {
        const sites = await Site.find({ type: req.params.type });
        if (sites.length === 0) return res.status(404).json({ success: false, message: "No sites found for this type" });
        res.json({ success: true, data: sites });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get sites by operator
export const getSitesByOperator = async (req, res) => {
    try {
        const sites = await Site.find({ operator: req.params.operator });
        if (sites.length === 0) return res.status(404).json({ success: false, message: "No sites found for this operator" });
        res.json({ success: true, data: sites });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get sites commissioned after a specific date
export const getSitesCommissionedAfter = async (req, res) => {
    const date = new Date(req.params.date);
    if (isNaN(date.getTime())) {
        return res.status(400).json({ success: false, message: "Invalid date format" });
    }
    try {
        const sites = await Site.find({ commissioned_on: { $gte: date } });
        if (sites.length === 0) return res.status(404).json({ success: false, message: "No sites found commissioned after this date" });
        res.json({ success: true, data: sites });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get sites by name
export const getSitesByName = async (req, res) => {
    try {
        const sites = await Site.find({ name: new RegExp(req.params.name, "i") });
        if (sites.length === 0) return res.status(404).json({ success: false, message: "No sites found with this name" });
        res.json({ success: true, data: sites });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export default {
    createSite,     
    getAllSites,
    getSiteById,
    updateSite,
    deleteSite, 
    getSitesByType,
    getSitesByOperator,
    getSitesCommissionedAfter,
    getSitesByName
};

