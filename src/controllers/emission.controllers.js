// controllers/emission.controllers.js
/*import Vehicle from "../models/vehicle.models.js";         // Registered vehicles
import VehicleRFID from "../models/vehicleRFID.models.js"; // RFID → vehicle mapping
import ParkingLot from "../models/parkinglot.model.js";   // Parking lot info
import EmissionFactor from "../models/emissionFactor.model.js";
import VehicleEmission from "../models/vehicleemision.models.js"; // Emission records

//// Vehicle entry & emission calculation
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

    // ⿤ Get parking lot for this site
   // const parkingLot = await ParkingLot.findOne({ site_id: siteId });
    //if (!parkingLot) return res.status(404).json({ message: "No parking lot found" });

    // ⿥ Get emission factor
    const factor = await EmissionFactor.findOne({
      vehicleType: vehicle.vehicleType,
      subType: vehicle.subType,

    });
 if (!factor) return res.status(404).json({ message: "Emission factor not found" });

    // ⿦ Get distance from entrance (fallback 1 km)
    //const distanceKm = parkingLot.distanceFromEntrances?.[entrance] || 1;
    const distanceKm =1;
    // ⿧ Calculate total emission
    const totalEmission = distanceKm * fuelConsumed * factor.emissionFactor;

    // ⿨ Save emission record
    const record = new VehicleEmission({
      siteId,
      vehicleId,
      vehicleType: vehicle.vehicleType,
      subType: vehicle.subType,
      
      distanceKm,
      fuelConsumed,
      emissionFactor: factor.emissionFactor,
      totalEmission,
      entrance // add this line
    });

    await record.save();
   // 7️⃣ Weekly aggregation (last 7 days)
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const emissions = await VehicleEmission.aggregate([
      {
        $match: {
          entrance: entrance,
          createdAt: { $gte: sevenDaysAgo, $lte: today }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalEmission: { $sum: "$totalEmission" },
          totalVehicles: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
// ✅ Response
    res.status(200).json({
     
      entrance,
      todayEmission: totalEmission,
      weeklyData: emissions,
    });
  } catch (error) {
    console.error("Weekly emissions error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};*/

    


// Get emissions per day for the last 7 days
/*export const calculateEmissionbyentrance = async (req, res) => {
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
*/
/*export const calculateEmissionbyentrance = async (req, res) => {
  try {
    const { rfid, entrance } = req.body;
    const siteId = "S001";
    //const fuelConsumed = 5; // not used yet
    //const parkingLotId = "68a6b0b00f83e24106bea47e";

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

    // ⿤ Get parking lot (fix for undefined parkingLot)
   // const parkingLot = await ParkingLot.findOne({ siteId });
    //if (!parkingLot) return res.status(404).json({ message: "Parking lot not found" });

    // 2️⃣ Calculate date 7 days ago
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6); // include today

    // 3️⃣ Aggregation pipeline
    const emissions = await VehicleEmission.aggregate([
      {
        $match: {
          
          entrance: entrance,
          createdAt: { $gte: sevenDaysAgo, $lte: today }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalEmission: { $sum: "$totalEmission" },
          totalVehicles: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // ✅ Response
    res.status(200).json({
      entrance,
      data: emissions
    });

  } catch (error) {
    console.error("Weekly emissions error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
*/




/*export const calculateEmissionbyentrance = async (req, res) => {
  try {
    const { rfid, entrance } = req.body;
    const fuelConsumptionRate = 5; // constant for now

    // 1️⃣ Clean & normalize RFID
    if (!rfid) return res.status(400).json({ message: "RFID is required" });
    const cleanRFID = rfid.trim().toUpperCase();

    // 2️⃣ Get vehicleId from RFID collection
    const rfidEntry = await VehicleRFID.findOne({ rfid: cleanRFID });
    if (!rfidEntry) return res.status(404).json({ message: "RFID not registered" });
    const vehicleId = rfidEntry.vehicleId;

    // 3️⃣ Get vehicle details (must contain emissionFactor field)
    const vehicle = await Vehicle.findOne({ vehicleId });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    if (!vehicle.emissionFactor) return res.status(400).json({ message: "Vehicle emission factor missing" });

    
    // ⿦ Get distance from entrance (fallback 1 km)
    const distanceKm = parkingLot.distanceFromEntrances?.[entrance] || 1;
    // 4️⃣ Get entrance distance from DB
    const entranceInfo = await .findOne({ name: entrance }); // e.g., { name: "Gate1", distanceKm: 1.2 }
    if (!entranceInfo) return res.status(404).json({ message: "Entrance not found" });

    // 5️⃣ Calculate emission
    const distance = entranceInfo.distanceKm; */
    /*const emissionFactor = vehicle.emissionFactor; 
    const totalEmission = distance * emissionFactor * fuelConsumptionRate;

    // 6️⃣ Save current emission record
    const emissionRecord = new VehicleEmission({
      vehicleId,
      entrance,
      distance,
      emissionFactor,
      fuelConsumptionRate,
      totalEmission,
      createdAt: new Date()
    });
    await emissionRecord.save();

    // 7️⃣ Weekly aggregation (last 7 days)
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const emissions = await VehicleEmission.aggregate([
      {
        $match: {
          entrance: entrance,
          createdAt: { $gte: sevenDaysAgo, $lte: today }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalEmission: { $sum: "$totalEmission" },
          totalVehicles: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // ✅ Response
    res.status(200).json({
      entrance,
      todayEmission: totalEmission,
      weeklyData: emissions
    });

  } catch (error) {
    console.error("Weekly emissions error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default { calculateEmissionbyentrance };*/


/*
export const calculateEmissionbyentrance = async (req, res) => {
  try {
    const { rfid, entrance } = req.body;
    const fuelConsumptionRate = 5; // constant for now

    // 1️⃣ Clean & normalize RFID
    if (!rfid) return res.status(400).json({ message: "RFID is required" });
    const cleanRFID = rfid.trim().toUpperCase();

    // 2️⃣ Get vehicleId from RFID collection
    const rfidEntry = await VehicleRFID.findOne({ rfid: cleanRFID });
    if (!rfidEntry) return res.status(404).json({ message: "RFID not registered" });
    const vehicleId = rfidEntry.vehicleId;
 
    const vehicle = await Vehicle.findOne({ vehicleId });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });


    // ⿥ Get emission factor
    const factor = await EmissionFactor.findOne({
      vehicleType: vehicle.vehicleType,
      subType: vehicle.subType,

    });
    
    // ⿦ Get distance from entrance (fallback 1 km)
    const distanceKm = 1.2;

    // ⿧ Calculate total emission
    const totalEmission = distanceKm * fuelConsumptionRate * factor.emissionFactor;

    // 6️⃣ Save current emission record
    const emissionRecord = new VehicleEmission({
      vehicleId,
      entrance,
      distanceKm,
      EmissionFactor,
      fuelConsumptionRate,
      totalEmission,
      createdAt: new Date()
    });
    await emissionRecord.save();

    // 7️⃣ Weekly aggregation (last 7 days)
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const emissions = await VehicleEmission.aggregate([
      {
        $match: {
          entrance: entrance,
          createdAt: { $gte: sevenDaysAgo, $lte: today }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalEmission: { $sum: "$totalEmission" },
          totalVehicles: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
// ✅ Response
    res.status(200).json({
     
      entrance,
      todayEmission: totalEmission,
      weeklyData: emissions,
    });
  } catch (error) {
    console.error("Weekly emissions error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
*/
//export default { calculateEmissionbyentrance };

// controllers/emission.controllers.js
import Vehicle from "../models/vehicle.models.js";         // Registered vehicles
import VehicleRFID from "../models/vehicleRFID.models.js"; // RFID → vehicle mapping
import ParkingLot from "../models/parkinglot.model.js";   // Parking lot info
import EmissionFactor from "../models/emissionFactor.model.js";
import VehicleEmission from "../models/vehicleemision.models.js"; // Emission records

// 🚗 Vehicle entry & emission calculation
export const calculateEmissionbyentrance = async (req, res) => {
  try {
    const { rfid, entrance } = req.body;
    const siteId = "S001";  // static for now
    const fuelConsumed = 5; // litres or units (constant for now)

    // ⿡ Clean & normalize RFID
    if (!rfid) return res.status(400).json({ message: "RFID is required" });
    const cleanRFID = rfid.trim().toUpperCase();

    // ⿢ Get vehicleId from RFID collection
    const rfidEntry = await VehicleRFID.findOne({ rfid: cleanRFID });
    if (!rfidEntry) return res.status(404).json({ message: "RFID not registered" });

    const vehicleId = rfidEntry.vehicleId;

    // ⿣ Get vehicle details
    const vehicle = await Vehicle.findOne({ vehicleId });
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    // ⿤ Get parking lot for this site
    const parkingLot = await ParkingLot.findOne({ site_id: siteId });
    if (!parkingLot) return res.status(404).json({ message: "No parking lot found" });

    // ⿥ Get emission factor based on vehicle type
    const factor = await EmissionFactor.findOne({
      vehicleType: vehicle.vehicleType,
      subType: vehicle.subType,
    });
    if (!factor) return res.status(404).json({ message: "Emission factor not found" });

    // ⿦ Get distance from entrance (fallback 1 km if not found)
    const distanceKm = parkingLot.distanceFromEntrances?.[entrance] || 1;

    // ⿧ Calculate total emission
    const totalEmission = distanceKm * fuelConsumed * factor.emissionFactor;

    // ⿨ Save emission record
    const record = new VehicleEmission({
      siteId,
      vehicleId,
      vehicleType: vehicle.vehicleType,
      subType: vehicle.subType,
      parkingLot: parkingLot._id,   // ✅ now required field satisfied
      distanceKm,
      fuelConsumed,
      emissionFactor: factor.emissionFactor,
      totalEmission,
      entrance
    });

    await record.save();

  // 7️⃣ Weekly aggregation (last 7 days)
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    const emissions = await VehicleEmission.aggregate([
      {
        $match: {
          entrance: entrance,
          createdAt: { $gte: sevenDaysAgo, $lte: today }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalEmission: { $sum: "$totalEmission" },
          totalVehicles: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
// ✅ Response
    res.status(200).json({
     
      entrance,
      todayEmission: totalEmission,
      weeklyData: emissions,
    });
  } catch (error) {
    console.error("Weekly emissions error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

