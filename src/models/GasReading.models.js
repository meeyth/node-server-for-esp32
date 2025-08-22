import mongoose from "mongoose";

const gasReadingSchema = new mongoose.Schema({
    reading_id: { type: String, required: true, unique: true }, // custom PK
    sensor_id: { type: String, required: true }, // FK to Sensor.sensor_id
    ts: { type: Date, default: Date.now },
    value: { type: Number }, // e.g., methane % v/v or ppm
    unit: { type: String }, // %, ppm, etc.
    quality_flag: { type: String } // optional: good, bad, etc.
});

const GasReading = mongoose.model("GasReading", gasReadingSchema);
export default GasReading;

