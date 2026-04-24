import mongoose from "mongoose";
import positionSchema from "../schemas/positionSchema.js";

const Position = mongoose.model("Position", positionSchema);

export default Position;