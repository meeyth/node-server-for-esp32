import dotenv from "dotenv";
import express from "express";
import cron from "node-cron";
import axios from "axios";

dotenv.config();
const app = express();
app.use(express.json());

// Accept POST request from ESP32 with some ID
app.post("/send-id", (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "ID is required" });
    }

    console.log("Received ID from ESP32:", id);
    res.json({ success: true, message: "ID received successfully" });
});

// Basic route to confirm server is running
app.get("/", (req, res) => {
    res.send("ESP32 Server is running ✅");
});

// Keep server alive by pinging itself every 14 minutes
cron.schedule("*/14 * * * *", async () => {
    try {
        const serverUrl = process.env.SERVER_URL || "https://node-server-for-esp32.onrender.com";
        console.log("Pinging self to stay alive:", serverUrl);
        await axios.get(serverUrl);
    } catch (error) {
        console.error("Ping failed:", error.message);
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
