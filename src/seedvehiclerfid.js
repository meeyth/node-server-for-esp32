import mongoose from "mongoose";
import dotenv from "dotenv";
import VehicleRFID from "./models/vehicleRFID.models.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const rfids = [
  { rfid: "1B61FE00", vehicleId: "V001" },
  { rfid: "333AAE02", vehicleId: "V002" },
  { rfid: "B3F57129", vehicleId: "V003" },
  { rfid: "5386F830", vehicleId: "V004" },
  { rfid: "BC782F03", vehicleId: "V005" },
  { rfid: "43C61E31", vehicleId: "V006" }
];

const seedRFIDs = async () => {
  await VehicleRFID.deleteMany({});
  await VehicleRFID.insertMany(rfids);
  console.log("✅ RFID mapping seeded successfully");
  mongoose.disconnect();
};

seedRFIDs();
// This script seeds the MongoDB database with RFID data.
// It connects to the database, clears any existing RFID mappings, and inserts new records based on the provided rfids array.   
