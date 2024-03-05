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
            type: Schema.Types.ObjectId,
            ref: "User"
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
        expired: {
            type: Boolean,
            default: false
        }
}, { timestamps: true })


export default model("Order", orderSchema)