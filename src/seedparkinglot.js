import mongoose from "mongoose";
import dotenv from "dotenv";
import ParkingLot from "../models/parkingLot.model.js";

dotenv.config();

const parkingLots = [
  {
    lot_id: "PL001",
    site_id: "S001",
    name: "Main Parking Lot",
    capacity: 50,
    location: { latitude: 12.9716, longitude: 77.5946 },
    distanceFromEntrances: { entrance1: 0.5, entrance2: 0.8 }
  },
  {
    lot_id: "PL002",
    site_id: "S001",
    name: "North Parking Lot",
    capacity: 30,
    location: { latitude: 12.9725, longitude: 77.5930 },
    distanceFromEntrances: { entrance1: 0.7, entrance2: 1.0 }
  }
];

const seedParkingLots = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const collectionName = ParkingLot.collection.name;
    //console.log("Deleting old data from collection:", collectionName);
    //await ParkingLot.deleteMany({});
    //console.log("✅ Old parking lots deleted");

    await ParkingLot.insertMany(parkingLots);
    console.log("✅ New parking lots seeded successfully");

    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding parking lots:", err);
    await mongoose.disconnect();
  }
};

seedParkingLots();
