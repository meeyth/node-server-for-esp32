import ParkingLot from "../models/parkinglot.model.js";

// Get all parking lots
export const getAllParkingLots = async (req, res) => {
  try {
    const lots = await ParkingLot.find();
    res.json({ success: true, data: lots });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export default {
    getAllParkingLots,
  
   
    
};
// This file contains the controller functions for managing parking lots in the application.

