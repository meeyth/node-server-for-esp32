// models/vehicleRFID.model.js
import mongoose from "mongoose";

const VehicleRFIDSchema = new mongoose.Schema({
  rfid: { type: String, required: true, unique: true },
  vehicleId: { type: String, required: true } // links to your VehicleEmission / Vehicle DB
}, { timestamps: true });

const VehicleRFID = mongoose.model("VehicleRFID", VehicleRFIDSchema);
export default VehicleRFID;
