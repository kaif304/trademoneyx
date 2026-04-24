import { Schema } from "mongoose";

const holdingSchema = new Schema({
    name    :   String,
    qty     :   Number,
    avg     :   Number,
    price   :   Number,
    net     :   String,
    day     :   String,
});

export default holdingSchema;