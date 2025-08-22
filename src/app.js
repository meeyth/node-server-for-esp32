import express from "express";

// Import routes (NOT controllers directly)
import gasReadingsRoutes from "./routes/gasreadings.routes.js";
import wasteBatchRoutes from "./routes/wastebatches.routes.js";
import siteRoutes from "./routes/sites.routes.js";
import compositionRoutes from "./routes/composition.routes.js";
import sensorsRoutes from "./routes/sensors.routes.js";
import parkingLotRoutes from "./routes/parkinglot.routes.js";
import emissionRoutes from "./routes/emission.routes.js";  
import dashboardRoutes from "./routes/dashboard.routes.js";


// Initialize Express app
const app = express();
app.use(express.json());

// Dashboard routes
app.use("/api/dashboard", dashboardRoutes);

// Use routes 
app.use("/api/gasreadings", gasReadingsRoutes);
app.use("/api/wastebatch", wasteBatchRoutes);
app.use("/api/site", siteRoutes);
app.use("/api/composition", compositionRoutes);
app.use("/api/sensors", sensorsRoutes);
app.use("/api/parkinglots", parkingLotRoutes); 
app.use("/api/emissions", emissionRoutes);  




// Basic route to confirm server is running
app.get("/", (req, res) => {
    res.send("ESP32 Server is running ✅");
});


export { app };
