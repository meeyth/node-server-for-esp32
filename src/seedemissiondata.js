import mongoose from "mongoose";
import dotenv from "dotenv";
import EmissionFactor from "./models/emissionFactor.model.js";

dotenv.config();

const data = [
  // Scooters
  { vehicleType: "Scooter", subType: "<110 CC", emissionFactor: 0.0334, emissionFactorUplift: 0.0368 },
  { vehicleType: "Scooter", subType: "<150 CC", emissionFactor: 0.0351, emissionFactorUplift: 0.0387 },

  // Motorcycles
  { vehicleType: "Motorcycle", subType: "<100 CC", emissionFactor: 0.0325, emissionFactorUplift: 0.0358 },
  { vehicleType: "Motorcycle", subType: "<125 CC", emissionFactor: 0.0290, emissionFactorUplift: 0.0319 },
  { vehicleType: "Motorcycle", subType: "<135 CC", emissionFactor: 0.0324, emissionFactorUplift: 0.0356 },
  { vehicleType: "Motorcycle", subType: "<200 CC", emissionFactor: 0.0417, emissionFactorUplift: 0.0458 },
  { vehicleType: "Motorcycle", subType: "<300 CC", emissionFactor: 0.0540, emissionFactorUplift: 0.0595 },
  { vehicleType: "Motorcycle", subType: "<500 CC", emissionFactor: 0.0542, emissionFactorUplift: 0.0597 },

  // Passenger Cars
  { vehicleType: "Passenger Car", subType: "Small <800 CC", fuel: "Gasoline", emissionFactor: 0.103, emissionFactorUplift: 0.111 },
  { vehicleType: "Passenger Car", subType: "Small <800 CC", fuel: "CNG", emissionFactor: 0.063, emissionFactorUplift: 0.068 },
  { vehicleType: "Passenger Car", subType: "Small <800 CC", fuel: "LPG", emissionFactor: 0.138, emissionFactorUplift: 0.149 },
  { vehicleType: "Passenger Car", subType: "Hatchback <1000 CC", fuel: "Gasoline", emissionFactor: 0.117, emissionFactorUplift: 0.127 },
  { vehicleType: "Passenger Car", subType: "Hatchback <1400 CC", fuel: "Gasoline", emissionFactor: 0.130, emissionFactorUplift: 0.140 },
  { vehicleType: "Passenger Car", subType: "Premium Hatchback <1600 CC", fuel: "Gasoline", emissionFactor: 0.150, emissionFactorUplift: 0.162 },
  { vehicleType: "Passenger Car", subType: "Compact SUV <1600 CC", fuel: "Gasoline", emissionFactor: 0.153, emissionFactorUplift: 0.166 },
  { vehicleType: "Passenger Car", subType: "Gypsy 1298 CC", fuel: "Gasoline", emissionFactor: 0.189, emissionFactorUplift: 0.204 },
  { vehicleType: "Passenger Car", subType: "Sedan <1400 CC", fuel: "Gasoline", emissionFactor: 0.142, emissionFactorUplift: 0.153 },
  { vehicleType: "Passenger Car", subType: "Sedan <1600 CC", fuel: "Gasoline", emissionFactor: 0.142, emissionFactorUplift: 0.153 },
  { vehicleType: "Passenger Car", subType: "Sedan <2000 CC", fuel: "Gasoline", emissionFactor: 0.149, emissionFactorUplift: 0.161 },
  { vehicleType: "Passenger Car", subType: "Sedan <2500 CC", fuel: "Gasoline", emissionFactor: 0.163, emissionFactorUplift: 0.176 },
  { vehicleType: "Passenger Car", subType: "SUV <3000 CC", fuel: "Gasoline", emissionFactor: 0.197, emissionFactorUplift: 0.213 },
  { vehicleType: "Passenger Car", subType: "MUV <2000 CC", fuel: "Gasoline", emissionFactor: 0.213, emissionFactorUplift: 0.230 },
  { vehicleType: "Passenger Car", subType: "Premium SUV <2000 CC", fuel: "Gasoline", emissionFactor: 0.193, emissionFactorUplift: 0.208 },
  { vehicleType: "Passenger Car", subType: "Premium SUV <3000 CC", fuel: "Gasoline", emissionFactor: 0.258, emissionFactorUplift: 0.279 },
  { vehicleType: "Passenger Car", subType: "Premium SUV >3000 CC", fuel: "Gasoline", emissionFactor: 0.267, emissionFactorUplift: 0.289 },
  { vehicleType: "Passenger Car", subType: "Premium Sedan <2000 CC", fuel: "Gasoline", emissionFactor: 0.191, emissionFactorUplift: 0.207 },
  { vehicleType: "Passenger Car", subType: "Premium Sedan <3000 CC", fuel: "Gasoline", emissionFactor: 0.194, emissionFactorUplift: 0.209 },
  { vehicleType: "Passenger Car", subType: "Premium Sedan >3000 CC", fuel: "Gasoline", emissionFactor: 0.250, emissionFactorUplift: 0.270 },
  { vehicleType: "Passenger Car", subType: "Hybrid <2000 CC", fuel: "Gasoline", emissionFactor: 0.095, emissionFactorUplift: 0.103 }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    await EmissionFactor.deleteMany({});
    console.log("Old emission data cleared");

    await EmissionFactor.insertMany(data);
    console.log("Emission data seeded successfully ✅");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
// This script seeds the MongoDB database with emission factor data for various vehicle types.
// It connects to the database, clears any existing data, and inserts new records based on the provided data array.node seedEmissionData.js
