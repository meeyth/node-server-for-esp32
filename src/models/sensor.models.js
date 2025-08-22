import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
    sensor_id: { type: String, required: true, unique: true }, // custom PK
    site_id: { type: String, required: true }, // FK to Site.site_id
    sensor_type: { type: String },
    gas_type: { type: String }, // CH4, CO2, O2, H2S, VOC
    unit: { type: String },
    install_date: { type: Date },
    calibrated_at: { type: Date },
    status: { type: String, default: "active" }
});

const Sensor = mongoose.model("Sensor", sensorSchema);
export default Sensor;
