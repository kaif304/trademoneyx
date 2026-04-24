import mongoose from "mongoose";
import portfolioHoldingSchema from "../schemas/portfolioHoldingSchema.js";

const PortfolioHolding =
    mongoose.models.PortfolioHolding ||
    mongoose.model("PortfolioHolding", portfolioHoldingSchema);

export default PortfolioHolding;
