import mongoose from "mongoose";
import stockSchema from "../schemas/stockSchema.js";

const Stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema);

export default Stock;
