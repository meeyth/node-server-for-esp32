import mongoose from "mongoose";

const compositionSchema = new mongoose.Schema({
    composition_id: { type: String, required: true, unique: true }, // custom PK
    batch_id: { type: String, required: true }, // FK to WasteBatch.batch_id
    component: { type: String }, // food, yard, paper, plastic, metal, glass, medical, solvent, battery, e-waste, other
    percent: { type: Number }
});

const Composition = mongoose.model("Composition", compositionSchema);
export default Composition;
