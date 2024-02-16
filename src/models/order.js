import { Schema, model } from "mongoose";

const orderSchema = new Schema (
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        senderLocation: {
            type: String,
            required: true
        },
        recipientLocation: {
            type: String,
            required: true
        },
        rider:{
            type: String,
        },
        price: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ["Accepted", "Pending", "Declined"],
            default: "Pending"
        },
        accepted: {
            type: Boolean,
            default: false
        },
        expired: {
            type: Boolean,
            default: false
        }
}, { timestamps: true })


export default model("Order", orderSchema)