import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  vehicleId: { type: String, unique: true, required: true },
  rfid: { type: String, unique: true, required: true },
  ownerName: { type: String },
  vehicleType: { type: String, required: true },
  subType: { type: String, required: true },
  fuel: { type: String },
  //registrationNumber: { type: String }
}, { timestamps: true });

export default mongoose.model("Vehicle", vehicleSchema);
