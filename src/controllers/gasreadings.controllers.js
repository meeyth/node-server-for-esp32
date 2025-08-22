import GasReading from "../models/GasReading.models.js";

// CREATE - add new gas reading
export const createGasReading = async (req, res) => {
  try {
    const newReading = new GasReading(req.body);
    await newReading.save();
    res.status(201).json(newReading);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - get all readings
export const getGasReadings = async (req, res) => {
  try {
    const readings = await GasReading.find();
    res.status(200).json(readings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - get by ID
export const getGasReadingById = async (req, res) => {
  try {
    const reading = await GasReading.findById(req.params.id);
    if (!reading) return res.status(404).json({ message: "Not found" });
    res.status(200).json(reading);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - get readings by sensor_id
export const getGasReadingsBySensor = async (req, res) => {     
    const { sensor_id } = req.params;
    try {
        const readings = await GasReading.find({ sensor_id }).sort({ ts: -1 });
        res.status(200).json(readings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };
    
// READ - get readings in a time range  
export const getGasReadingsInRange = async (req, res) => {
    const { start, end } = req.query;
    try {
        const readings = await GasReading.find({
            ts: { $gte: new Date(start), $lte: new Date(end) }
        }).sort({ ts: 1 });
        res.status(200).json(readings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  

// READ - get a specific gas reading by reading_id
export const getGasReadingByReadingId = async (req, res) => {
    const { reading_id } = req.params;
    try {
        const reading = await GasReading.findOne({ reading_id });
        if (!reading) {
            return res.status(404).json({ message: "Reading not found" });
        }   
        res.status(200).json(reading);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ - get readings for a specific sensor within a time range
export const getGasReadingsBySensorInRange = async (req, res) => {  
    const { sensor_id } = req.params;
    const { start, end } = req.query;

    try {
        const readings = await GasReading.find({
            sensor_id,
            ts: { $gte: new Date(start), $lte: new Date(end) }
        }).sort({ ts: 1 });

        res.status(200).json(readings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    createGasReading,
    getGasReadings,
    getGasReadingById,  
    getGasReadingsBySensor,
    getGasReadingsInRange,
    getGasReadingByReadingId,
    getGasReadingsBySensorInRange
};


