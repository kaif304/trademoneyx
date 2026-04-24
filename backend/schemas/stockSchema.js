import { Schema } from "mongoose";

const stockSchema = new Schema(
    {
        symbol: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        companyName: {
            type: String,
            required: true,
            trim: true,
        },
        sector: {
            type: String,
            default: "Equity",
        },
        exchange: {
            type: String,
            default: "NSE",
        },
        currentPrice: {
            type: Number,
            required: true,
        },
        previousClose: {
            type: Number,
            required: true,
        },
        openPrice: {
            type: Number,
            required: true,
        },
        dayHigh: {
            type: Number,
            required: true,
        },
        dayLow: {
            type: Number,
            required: true,
        },
        volume: {
            type: Number,
            default: 0,
        },
        marketCap: {
            type: Number,
            default: 0,
        },
        peRatio: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            default: "",
        },
        history: {
            type: [Number],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export default stockSchema;
