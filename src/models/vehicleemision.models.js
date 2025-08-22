// models/vehicleEmission.model.js
import mongoose from "mongoose";

const VehicleEmissionSchema = new mongoose.Schema(
  {
    siteId: { type: String, required: true },
    vehicleId: { type: String, required: true },
    vehicleType: { type: String, required: true },
    subType: { type: String },
    fuel: { type: String },
    parkingLot: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingLot", required: true },
    distanceKm: { type: Number, required: true },
    fuelConsumed: { type: Number, required: true },
    emissionFactor: { type: Number, required: true },
    totalEmission: { type: Number, required: true },
     entrance: { type: String, required: true },       // NEW
      timestamp: { type: Date, default: Date.now }      // NEW
  }
  , 
  {
    timestamps: true // Automatically manage createdAt and updatedAt fields
  } 
);

const VehicleEmission = mongoose.model("VehicleEmission", VehicleEmissionSchema);

export default VehicleEmission;
// This model defines the structure for vehicle emissions in the database.
// It includes fields for site ID, vehicle ID, type, fuel, parking lot reference,