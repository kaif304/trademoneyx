import { Schema } from "mongoose";

const positionSchema = new Schema({
    product    :   String,
    name       :   String,
    qty        :   Number,
    avg        :   Number,
    price      :   Number,
    net        :   String,
    day        :   String,
    isLoss     :   Boolean,
});

export default positionSchema;