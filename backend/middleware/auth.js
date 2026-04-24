import User from "../models/userModel.js";
import { verifyAuthToken } from "../utils/auth.js";

export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || "";

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authentication required." });
        }

        const token = authHeader.replace("Bearer ", "").trim();
        const payload = verifyAuthToken(token);
        const user = await User.findById(payload.userId).select("-passwordHash");

        if (!user) {
            return res.status(401).json({ message: "User session is invalid." });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message || "Unauthorized." });
    }
};
