import { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        userId  :   {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        symbol  :   {
            type: String,
            uppercase: true,
            trim: true,
        },
        companyName: {
            type: String,
        },
        name    :   String,
        qty     :   Number,
        price   :   Number,
        mode    :   String,
        total   :   Number,
        status  :   {
            type: String,
            default: "completed"
        }
    },
    {
        timestamps: true
    }
);

export default orderSchema;
