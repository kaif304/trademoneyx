import mongoose from "mongoose";
import walletSchema from "../schemas/walletSchema.js";

const Wallet = mongoose.models.Wallet || mongoose.model("Wallet", walletSchema);

export default Wallet;
