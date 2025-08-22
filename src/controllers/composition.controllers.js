import Composition from "../models/compostion.models.js";

// Create a new composition
export const createComposition = async (req, res) => {
    const { composition_id, batch_id, component, percent } = req.body;

    if (!composition_id || !batch_id || !component || percent === undefined) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        const newComposition = new Composition({ composition_id, batch_id, component, percent });
        await newComposition.save();
        res.status(201).json({ success: true, data: newComposition });
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ success: false, message: "Composition ID already exists" });
        } else {
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }
};

// Get all compositions
export const getAllCompositions = async (req, res) => {
    try {
        const compositions = await Composition.find().sort({ batch_id: 1 });
        res.json({ success: true, data: compositions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get compositions by batch_id
export const getCompositionsByBatch = async (req, res) => {
    try {
        const compositions = await Composition.find({ batch_id: req.params.batch_id });
        res.json({ success: true, data: compositions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get composition by composition_id
export const getCompositionById = async (req, res) => {
    try {
        const composition = await Composition.findOne({ composition_id: req.params.composition_id });
        if (!composition) return res.status(404).json({ success: false, message: "Composition not found" });
        res.json({ success: true, data: composition });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
export default {
    createComposition,
    getAllCompositions,
    getCompositionsByBatch,
    getCompositionById
};