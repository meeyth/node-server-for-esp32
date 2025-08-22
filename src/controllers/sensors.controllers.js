import Sensor from "../models/sensor.models.js";

// Create a new sensor
export const createSensor = async (req, res) => {
    const { sensor_id, site_id, sensor_type, gas_type, unit, install_date, calibrated_at, status } = req.body;
    if (!sensor_id || !site_id) {
        return res.status(400).json({ success: false, message: "sensor_id and site_id are required" });
    }
    try {
        const newSensor = new Sensor({ sensor_id, site_id, sensor_type, gas_type, unit, install_date, calibrated_at, status });
        await newSensor.save();
        res.status(201).json({ success: true, data: newSensor });
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ success: false, message: "Sensor ID already exists" });
        } else {
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }
};

// Get all sensors
export const getAllSensors = async (req, res) => {
    try {
        const sensors = await Sensor.find();
        res.json({ success: true, data: sensors });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Get sensor by sensor_id
export const getSensorById = async (req, res) => {
    try {
        const sensor = await Sensor.findOne({ sensor_id: req.params.sensor_id });
        if (!sensor) return res.status(404).json({ success: false, message: "Sensor not found" });
        res.json({ success: true, data: sensor });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
// Update sensor by sensor_id
export const updateSensorById = async (req, res) => {   
    try {
        const sensor = await Sensor.findOneAndUpdate(
            { sensor_id: req.params.sensor_id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!sensor) return res.status(404).json({ success: false, message: "Sensor not found" });
        res.json({ success: true, data: sensor });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export default {
    createSensor,       
    getAllSensors,
    getSensorById,
    updateSensorById
};