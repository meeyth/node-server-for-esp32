import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

dotenv.config();

// Import models
import Site from "./models/site.models.js";
import Sensor from "./models/sensor.models.js";
import WasteBatch from "./models/wasteBatch.models.js";
import Composition from "./models/compostion.models.js";
import GasReading from "./models/GasReading.models.js";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Generate random enum value
const randomEnum = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Seed function
const seedData = async () => {
  try {
    // Clear existing data
    await Site.deleteMany({});
    await Sensor.deleteMany({});
    await WasteBatch.deleteMany({});
    await Composition.deleteMany({});
    await GasReading.deleteMany({});
    console.log("Old data cleared");

    // 1️⃣ Sites (5 records)
    const siteTypes = ["landfill", "compost_plant", "biogas_plant"];
    const sites = [];
    for (let i = 1; i <= 5; i++) {
      sites.push({
        site_id: `S${i.toString().padStart(3, "0")}`,
        name: faker.company.name(),
        type: randomEnum(siteTypes),
        address: faker.location.streetAddress(),
        latitude: parseFloat(faker.location.latitude()),
        longitude: parseFloat(faker.location.longitude()),
        operator: faker.company.name(),
        commissioned_on: faker.date.past({ years: 5 })
      });
    }
    await Site.insertMany(sites);

    // 2️⃣ Sensors (7 records)
    const gasTypes = ["CH4", "CO2", "O2", "H2S", "VOC"];
    const sensorStatus = ["active", "inactive", "maintenance"];
    const sensors = [];
    for (let i = 1; i <= 7; i++) {
      sensors.push({
        sensor_id: `SN${i.toString().padStart(3, "0")}`,
        site_id: randomEnum(sites).site_id,
        sensor_type: randomEnum(["fixed", "portable"]),
        gas_type: randomEnum(gasTypes),
        unit: randomEnum(["%", "ppm"]),
        install_date: faker.date.past({ years: 3 }),
        calibrated_at: faker.date.recent({ days: 300 }),
        status: randomEnum(sensorStatus)
      });
    }
    await Sensor.insertMany(sensors);

    // 3️⃣ WasteBatches (8 records)
    const batchCategories = ["biodegradable", "mixed", "hazardous"];
    const batches = [];
    for (let i = 1; i <= 8; i++) {
      batches.push({
        batch_id: `B${i.toString().padStart(3, "0")}`,
        site_id: randomEnum(sites).site_id,
        source: faker.company.name(),
        received_at: faker.date.recent({ days: 30 }),
        mass_kg: faker.number.int({ min: 100, max: 1000 }),
        moisture_pct: faker.number.int({ min: 30, max: 70 }),
        toc_pct: faker.number.int({ min: 20, max: 50 }),
        volatile_solids_pct: faker.number.int({ min: 50, max: 80 }),
        c_n_ratio: faker.number.int({ min: 15, max: 30 }),
        category_submitted: randomEnum(batchCategories),
        notes: faker.lorem.sentence()
      });
    }
    await WasteBatch.insertMany(batches);

    // 4️⃣ Compositions (10 records)
    const components = ["food", "yard", "paper", "plastic", "metal", "glass", "medical", "solvent", "battery", "e-waste", "other"];
    const compositions = [];
    for (let i = 1; i <= 10; i++) {
      const batch = randomEnum(batches);
      compositions.push({
        composition_id: `C${i.toString().padStart(3, "0")}`,
        batch_id: batch.batch_id,
        component: randomEnum(components),
        percent: faker.number.int({ min: 5, max: 80 })
      });
    }
    await Composition.insertMany(compositions);

    // 5️⃣ GasReadings (20 records)
    const qualityFlags = ["good", "bad", "suspect"];
    const readings = [];
    for (let i = 1; i <= 20; i++) {
      const sensor = randomEnum(sensors);
      readings.push({
        reading_id: `G${i.toString().padStart(3, "0")}`,
        sensor_id: sensor.sensor_id,
        ts: faker.date.recent({ days: 10 }),
        value: parseFloat((Math.random() * 30).toFixed(2)), // methane % between 0-30
        unit: sensor.unit,
        quality_flag: randomEnum(qualityFlags)
      });
    }
    await GasReading.insertMany(readings);

    console.log("Random data inserted successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Run
const run = async () => {
  await connectDB();
  await seedData();
};

run();
