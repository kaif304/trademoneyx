import { Schema } from "mongoose";

const walletTransactionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        balanceAfter: {
            type: Number,
            required: true,
        },
        method: {
            type: String,
            default: "SIMULATED",
        },
        status: {
            type: String,
            default: "completed",
        },
        reference: {
            type: String,
            required: true,
        },
        note: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default walletTransactionSchema;
