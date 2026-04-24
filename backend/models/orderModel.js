import mongoose from "mongoose";
import orderSchema from "../schemas/orderSchema.js";

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
