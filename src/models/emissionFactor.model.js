import mongoose from "mongoose";

const EmissionFactorSchema = new mongoose.Schema(
    {
        vehicleType: {
            type: String, // e.g. "scooter", "motorcycle", "car", "bus"
            required: true,
        },
        subType: {
            type: String, // e.g. "Small", "Hatchback", "Sedan", "Premium SUV"
        },
        fuel: {
            type: String, // e.g. "Gasoline", "Diesel", "CNG", "LPG"
            default: null,
        },
        engineCcMin: {
            type: Number,
            default: null, // Some vehicles like buses may not need CC
        },
        engineCcMax: {
            type: Number,
            default: null,
        },
        emissionFactor: {
            type: Number, // kg CO2/km (base factor)
            required: true,
        },
        emissionFactorUplift: {
            type: Number, // kg CO2/km with uplift factor
            required: true,
        },
        notes: {
            type: String, // For extra info like "Gypsy 1298 CC" or exceptions
        },
    },
    { timestamps: true }
);

const EmissionFactor = mongoose.model("EmissionFactor", EmissionFactorSchema);

export default EmissionFactor;
