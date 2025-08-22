import mongoose from "mongoose";

const parkingLotSchema = new mongoose.Schema({
  lot_id: { type: String, required: true, unique: true }, // Custom ID
  site_id: { type: String, required: true }, // FK to Site
  name: { type: String, required: true },
  capacity: { type: Number, default: 0 },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  //status: { type: String, default: "active" }, // active / inactive
  isAvailable: { type: Boolean, default: true }, // availability
distanceFromEntrances: { // NEW
    entrance1: { type: Number, required: true },
    entrance2: { type: Number, required: true }
  }
}, { timestamps: true });

//const ParkingLot = mongoose.model("ParkingLot", parkingLotSchema);
const ParkingLot =
  mongoose.models.ParkingLot || mongoose.model("ParkingLot", parkingLotSchema);
export default ParkingLot;
// This model defines the structure for parking lots in the database.