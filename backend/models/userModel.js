import mongoose from "mongoose";
import userSchema from "../schemas/userSchema.js";

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
