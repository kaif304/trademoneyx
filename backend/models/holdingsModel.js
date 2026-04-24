import mongoose from "mongoose";
import holdingSchema from "../schemas/holdingsSchema.js";

const Holding = mongoose.model("Holding", holdingSchema);

export default Holding;