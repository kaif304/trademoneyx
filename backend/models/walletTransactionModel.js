import mongoose from "mongoose";
import walletTransactionSchema from "../schemas/walletTransactionSchema.js";

const WalletTransaction =
    mongoose.models.WalletTransaction ||
    mongoose.model("WalletTransaction", walletTransactionSchema);

export default WalletTransaction;
