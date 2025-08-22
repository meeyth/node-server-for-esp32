import mongoose from "mongoose";

const wasteBatchSchema = new mongoose.Schema({
    batch_id: { type: String, required: true, unique: true }, // custom PK
    site_id: { type: String, required: true }, // FK to Site.site_id
    source: { type: String },
    received_at: { type: Date, default: Date.now },
    mass_kg: { type: Number },
    moisture_pct: { type: Number },
    toc_pct: { type: Number },
    volatile_solids_pct: { type: Number },
    c_n_ratio: { type: Number },
    category_submitted: { type: String }, // biodegradable/mixed/hazardous
    notes: { type: String }
});

const WasteBatch = mongoose.model("WasteBatch", wasteBatchSchema);
export default WasteBatch;
