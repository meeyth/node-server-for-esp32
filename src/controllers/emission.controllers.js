// controllers/emission.controllers.js
import Vehicle from "../models/vehicle.models.js";         // Registered vehicles
import VehicleRFID from "../models/vehicleRFID.models.js"; // RFID → vehicle mapping
import ParkingLot from "../models/parkinglot.model.js";   // Parking lot info
import EmissionFactor from "../models/emissionFactor.model.js";
import VehicleEmission from "../models/vehicleemision.models.js"; // Emission records

//// Vehicle entry & emission calculation
/*export const calculateEmission = async (req, res) => {
  try {
    const { rfid, entrance } = req.body;
    const siteId = "S001";
    const fuelConsumed = 5;

    // ⿡ Clean & normalize RFID
    if (!rfid) return res.status(400).json({ message: "RFID is required" });
    const cleanRFID = rfid.trim().toUpperCase();

    // ⿢ Get vehicleId from RFID collection
    const rfidEntry = await VehicleRFID.findOne({ rfid: cleanRFID });
    if (!rfidEntry) return res.status(404).json({ message: "RFID not registered" });

    const vehicleId = rfidEntry.vehicleId;

    // ⿣ Get vehicle details from Vehicle collection
    const vehicle = await Vehicle.findOne({ vehicleId });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    // ⿤ Get parking lot for this site
    const parkingLot = await ParkingLot.findOne({ site_id: siteId });
    if (!parkingLot) return res.status(404).json({ message: "No parking lot found" });

    // ⿥ Get emission factor
    const factor = await EmissionFactor.findOne({
      vehicleType: vehicle.vehicleType,
      subType: vehicle.subType,

    });
 if (!factor) return res.status(404).json({ message: "Emission factor not found" });

    // ⿦ Get distance from entrance (fallback 1 km)
    const distanceKm = parkingLot.distanceFromEntrances?.[entrance] || 1;

    // ⿧ Calculate total emission
    const totalEmission = distanceKm * fuelConsumed * factor.emissionFactor;

    // ⿨ Save emission record
    const record = new VehicleEmission({
      siteId,
      vehicleId,
      vehicleType: vehicle.vehicleType,
      subType: vehicle.subType,
      parkingLot: parkingLot._id,
      distanceKm,
      fuelConsumed,
      emissionFactor: factor.emissionFactor,
      totalEmission,
      entrance // add this line
    });

    await record.save();

    res.status(201).json({
      message: "Emission calculated successfully",
      data: record
    });

  } catch (error) {
    console.error("Emission calculation error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};*/

// Get emissions per day for the last 7 days
export const calculateEmissionbyentrance = async (req, res) => {
  try {
    const { rfid, entrance } = req.body;
    const siteId = "S001";
    const fuelConsumed = 5;

    // ⿡ Clean & normalize RFID
    if (!rfid) return res.status(400).json({ message: "RFID is required" });
    const cleanRFID = rfid.trim().toUpperCase();

    // ⿢ Get vehicleId from RFID collection
    const rfidEntry = await VehicleRFID.findOne({ rfid: cleanRFID });
    if (!rfidEntry) return res.status(404).json({ message: "RFID not registered" });

    const vehicleId = rfidEntry.vehicleId;

    // ⿣ Get vehicle details from Vehicle collection
    const vehicle = await Vehicle.findOne({ vehicleId });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    // 2️⃣ Calculate date 7 days ago
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6); // include today

    // 3️⃣ Aggregation pipeline
    const emissions = await VehicleEmission.aggregate([
      {
        $match: {
          parkingLot: parkingLot._id,
          entrance: entrance,
          createdAt: { $gte: sevenDaysAgo, $lte: today }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } // group by day
          },
          totalEmission: { $sum: "$totalEmission" },
          totalVehicles: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } // sort by date ascending
    ]);

    res.status(200).json({
      parkingLot: parkingLot.name,
      entrance,
      data: emissions
    });

  } catch (error) {
    console.error("Weekly emissions error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default {

  calculateEmissionbyentrance 
};

