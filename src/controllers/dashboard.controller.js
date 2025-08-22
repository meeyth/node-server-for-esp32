/*import Site from "../models/site.models.js";
import Sensor from "../models/sensor.models.js";
import GasReading from "../models/GasReading.models.js";
import WasteBatch from "../models/wasteBatch.models.js";

// Get methane readings for a site based on waste batches
export const getSiteMethaneFromBatches = async (req, res) => {
  const { site_id } = req.params;

  try {
    // 1. Fetch site
    const site = await Site.findOne({ site_id });
    if (!site) return res.status(404).json({ message: "Site not found" });

    // 2. Fetch active methane sensors for site
    const sensors = await Sensor.find({ site_id, gas_type: "CH4", status: "active" });
    if (!sensors.length) return res.status(404).json({ message: "No active methane sensors found" });

    const sensorIds = sensors.map(s => s.sensor_id);

    // 3. Get earliest and latest received_at from waste batches at this site
    const batches = await WasteBatch.find({ site_id });
    if (!batches.length) return res.status(404).json({ message: "No waste batches found at this site" });

    const start = new Date(Math.min(...batches.map(b => new Date(b.received_at))));
    const end = new Date(Math.max(...batches.map(b => new Date(b.received_at))));

    // Optional: Extend the end to include now
    const endTime = new Date(); 
    if (end < endTime) end.setTime(endTime.getTime());

    // 4. Fetch methane sensor readings in % with good quality in this time range
    const readings = await GasReading.find({
      sensor_id: { $in: sensorIds },
      ts: { $gte: start, $lte: end },
      unit: "%",
      quality_flag: "good"
    }).sort({ ts: 1 });

    // 5. Aggregate readings per sensor
    const totalMethanePerSensor = {};
    const countPerSensor = {};

    readings.forEach(r => {
      if (!totalMethanePerSensor[r.sensor_id]) {
        totalMethanePerSensor[r.sensor_id] = 0;
        countPerSensor[r.sensor_id] = 0;
      }
      totalMethanePerSensor[r.sensor_id] += r.value;
      countPerSensor[r.sensor_id] += 1;
    });

    // 6. Format time in IST
    const options = { timeZone: 'Asia/Kolkata', hour12: false, year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit' };
    const startIST = start.toLocaleString('en-GB', options);
    const endIST = end.toLocaleString('en-GB', options);

    // 7. Prepare output
    const dashboardData = sensorIds.map(sensor_id => {
      const avgMethane = countPerSensor[sensor_id] ? (totalMethanePerSensor[sensor_id] / countPerSensor[sensor_id]) : 0;

      // Classification
      let status = '';
      if (avgMethane < 5) status = 'Biodegradable, Safe';
      else if (avgMethane <= 20) status = 'Biodegradable, Caution';
      else status = 'Hazardous Waste';

      // Area status
      let areaStatus = '';
      if (avgMethane < 5) areaStatus = 'OK';
      else if (avgMethane <= 20) areaStatus = 'Warning';
      else areaStatus = 'Hazard';

      return {
        sensor_id,
        site_name: site.name,
        averageMethane: parseFloat(avgMethane.toFixed(2)),
        status,
        areaStatus,
        timeRange: `${startIST} to ${endIST}`
      };
    });

    res.status(200).json(dashboardData);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getSiteMethaneFromBatches };
*/
/*
import Site from "../models/site.models.js";
import Sensor from "../models/sensor.models.js";
import GasReading from "../models/GasReading.models.js";
import WasteBatch from "../models/wasteBatch.models.js";

// Get methane readings for a site based on waste batches
export const getSiteMethaneFromBatches = async (req, res) => {
  const { site_id } = req.params;

  try {
    // 1. Fetch site
    const site = await Site.findOne({ site_id });
    if (!site) return res.status(404).json({ message: "Site not found" });

    // 2. Fetch active methane sensors for site
    const sensors = await Sensor.find({ site_id, gas_type: "CH4", status: "active" });
    if (!sensors.length) return res.status(404).json({ message: "No active methane sensors found" });

    const sensorIds = sensors.map(s => s.sensor_id);

    // 3. Get earliest and latest received_at from waste batches at this site
    const batches = await WasteBatch.find({ site_id });
    if (!batches.length) return res.status(404).json({ message: "No waste batches found at this site" });

    const start = new Date(Math.min(...batches.map(b => new Date(b.received_at))));
    const end = new Date(Math.max(...batches.map(b => new Date(b.received_at))));
    const endTime = new Date();
    if (end < endTime) end.setTime(endTime.getTime());

    // 4. Fetch methane sensor readings in % with good quality in this time range
    const readings = await GasReading.find({
      sensor_id: { $in: sensorIds },
      ts: { $gte: start, $lte: end },
      unit: "%",
      quality_flag: "good"
    }).sort({ ts: 1 });

    // 5. Aggregate readings per sensor
    const totalMethanePerSensor = {};
    const countPerSensor = {};

    readings.forEach(r => {
      if (!totalMethanePerSensor[r.sensor_id]) {
        totalMethanePerSensor[r.sensor_id] = 0;
        countPerSensor[r.sensor_id] = 0;
      }
      totalMethanePerSensor[r.sensor_id] += r.value;
      countPerSensor[r.sensor_id] += 1;
    });

    // 6. Format time in IST
    const options = { timeZone: 'Asia/Kolkata', hour12: false, year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit' };
    const startIST = start.toLocaleString('en-GB', options);
    const endIST = end.toLocaleString('en-GB', options);

    // 7. Prepare output
    const dashboardData = sensors.map(sensor => {
      let avgMethane = 0;

      // If readings exist for this sensor, calculate average
      if (totalMethanePerSensor[sensor.sensor_id]) {
        avgMethane = totalMethanePerSensor[sensor.sensor_id] / countPerSensor[sensor.sensor_id];
      } else {
        // Estimate methane from waste batches (simple average of TOC * mass factor)
        const batchMethane = batches.map(b => (b.toc_pct / 100) * b.mass_kg); 
        avgMethane = batchMethane.reduce((a, c) => a + c, 0) / batchMethane.length;
        // Scale to a % for dashboard representation
        avgMethane = parseFloat((avgMethane / 1000).toFixed(2)); // adjust divisor as per your scaling
      }

      // Classification
      let status = '';
      let areaStatus = '';
      if (avgMethane < 5) {
        status = 'Biodegradable, Safe';
        areaStatus = 'OK';
      } else if (avgMethane <= 20) {
        status = 'Biodegradable, Caution';
        areaStatus = 'Warning';
      } else {
        status = 'Hazardous Waste';
        areaStatus = 'Hazard';
      }

      return {
        sensor_id: sensor.sensor_id,
        site_name: site.name,
        averageMethane: parseFloat(avgMethane.toFixed(2)),
        status,
        areaStatus,
        timeRange: `${startIST} to ${endIST}`
      };
    });

    res.status(200).json(dashboardData);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getSiteMethaneFromBatches };*/

import Site from "../models/site.models.js";
import Sensor from "../models/sensor.models.js";
import WasteBatch from "../models/wasteBatch.models.js";

// Get methane reading for a site based on waste batches (one sensor only)
export const getSiteMethaneFromBatches = async (req, res) => {
  const { site_id } = req.params;

  try {
    // 1. Fetch site
    const site = await Site.findOne({ site_id });
    if (!site) return res.status(404).json({ message: "Site not found" });

    // 2. Fetch one active methane sensor for the site
    const sensor = await Sensor.findOne({ site_id, gas_type: "CH4", status: "active" });
    if (!sensor) return res.status(404).json({ message: "No active methane sensor found" });

    // 3. Fetch waste batches for the site
    const batches = await WasteBatch.find({ site_id });
    if (!batches.length) return res.status(404).json({ message: "No waste batches found at this site" });

    // 4. Determine time range
    const start = new Date(Math.min(...batches.map(b => new Date(b.received_at))));
    const end = new Date(Math.max(...batches.map(b => new Date(b.received_at))));
    const options = { timeZone: 'Asia/Kolkata', hour12: false, year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit' };
    const startIST = start.toLocaleString('en-GB', options);
    const endIST = end.toLocaleString('en-GB', options);

     //5. Estimate methane from batches (example formula: TOC% * mass)
    const methaneValues = batches.map(b => (b.toc_pct / 100) * b.mass_kg);
    let avgMethane = methaneValues.reduce((a, c) => a + c, 0) / methaneValues.length;
    avgMethane = parseFloat((avgMethane / 10000).toFixed(2)); // scale down for dashboard*/
   
 
    
    // 6. Classify
    let status = '', areaStatus = '';
    if (avgMethane < 5) { status = 'Biodegradable, Safe'; areaStatus = 'OK'; }
    else if (avgMethane <= 20) { status = 'Biodegradable, Caution'; areaStatus = 'Warning'; }
    else { status = 'Hazardous Waste'; areaStatus = 'Hazard'; }

    // 7. Prepare dashboard data
    const dashboardData = [{
      sensor_id: sensor.sensor_id,
      site_name: site.name,
      averageMethane: avgMethane,
      status,
      areaStatus,
      timeRange: `${startIST} to ${endIST}`
    }];

    res.status(200).json(dashboardData);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getSiteMethaneFromBatches };
