import {watchlist, holdings, positions} from "./data.js"
import Holding from "../models/holdingsModel.js"
import Position from "../models/positoinModel.js"

export function addData() {
    console.log("Data added");
}

export async function addHoldings() {
    try {
        await Holding.deleteMany({});
        await Holding.insertMany(holdings);
        
        console.log("Holdings inserted successfully")
    }
    catch (error) {
        console.error(`DB insertion error: ${error.message}`);
    }
}

export async function addPositions() {
    try {
        await Position.deleteMany({});
        await Position.insertMany(positions);
        
        console.log("Positions inserted successfully")
    }
    catch (error) {
        console.error(`DB insertion error: ${error.message}`);
    }
}