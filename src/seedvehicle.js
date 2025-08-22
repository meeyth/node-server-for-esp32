import mongoose from "mongoose";
import dotenv from "dotenv";
import Vehicle from "./models/vehicle.models.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

const vehicles = [
  { vehicleId: "V001", rfid: "1B61FE00", vehicleType: "Passenger Car", subType: "Small <800 CC", fuel: "CNG" },
  { vehicleId: "V002", rfid: "333AAE02", vehicleType: "Scooter", subType: "<110 CC", fuel: "Gasoline" },
  { vehicleId: "V003", rfid: "B3F57129", vehicleType: "Motorcycle", subType: "<125 CC", fuel: "Gasoline" },
  { vehicleId: "V004", rfid: "5386F830", vehicleType: "Motorcycle", subType: "<200 CC", fuel: "Gasoline" },
 // { vehicleId: "V005", rfid: "BC782F03", vehicleType: "Three Wheeler", subType: "Diesel", fuel: "Diesel" },
  { vehicleId: "V006", rfid: "43C61E31", vehicleType: "Passenger Car", subType: "Small <800 CC", fuel: "CNG" }
];

const seedVehicles = async () => {
  try {
    await Vehicle.deleteMany({});
    console.log("✅ Old parking lots deleted");
    await Vehicle.insertMany(vehicles);
    console.log("✅ Vehicles seeded");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

seedVehicles();
// This script seeds the Vehicle collection in MongoDB with predefined vehicle data.
// It connects to the database, clears any existing data, and inserts new vehicle records.