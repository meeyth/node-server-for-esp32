import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
    site_id: { type: String, required: true, unique: true }, // custom PK
    name: { type: String, required: true },
    type: { type: String },
    address: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    operator: { type: String },
    commissioned_on: { type: Date }
});

const Site = mongoose.model("Site", siteSchema);
export default Site;
