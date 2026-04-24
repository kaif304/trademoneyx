import { connectDB } from "../config/db.js";
import { addData, addHoldings, addPositions } from "../init/initData.js";

export default function runIndexFile() {
    connectDB();
    addHoldings();
    addPositions();
}