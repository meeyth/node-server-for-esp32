import WasteBatch from "../models/wasteBatch.models.js";

// Create a new waste batch
export const createWasteBatch = async (req, res) => {
    const {
        batch_id, site_id, source, received_at, mass_kg,
        moisture_pct, toc_pct, volatile_solids_pct, c_n_ratio,
        category_submitted, notes
    } = req.body;

    if (!batch_id || !site_id) {
        return res.status(400).json({ success: false, message: "batch_id and site_id are required" });
    }

    try {
        const newBatch = new WasteBatch({
            batch_id, site_id, source, received_at, mass_kg,
            moisture_pct, toc_pct, volatile_solids_pct, c_n_ratio,
            category_submitted, notes
        });
        await newBatch.save();
        res.status(201).json({ success: true, data: newBatch });
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ success: false, message: "Batch ID already exists" });
        } else {
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }
};

// Get all waste batches
export const getAllWasteBatches = async (req, res) => {
    try {
        const batches = await WasteBatch.find().sort({ received_at: -1 });
        res.json({ success: true, data: batches });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get a waste batch by batch_id
export const getWasteBatchById = async (req, res) => {
    try {
        const batch = await WasteBatch.findOne({ batch_id: req.params.batch_id });
        if (!batch) return res.status(404).json({ success: false, message: "Batch not found" });
        res.json({ success: true, data: batch });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
// Export all controllers
export default {    
    createWasteBatch,
    getAllWasteBatches,
    getWasteBatchById
};  