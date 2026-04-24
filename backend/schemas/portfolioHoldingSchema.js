import { Schema } from "mongoose";

const portfolioHoldingSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        symbol: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
        averagePrice: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

portfolioHoldingSchema.index({ userId: 1, symbol: 1 }, { unique: true });

export default portfolioHoldingSchema;
