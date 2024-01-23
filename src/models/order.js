import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema ({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
    senderLocation: {type: String},
    recipient: {type: String},  //recipient is a string representing the user
    price: Number,
    status: {type: String, enum: ["Accepted", "Pending", "Declined"], default: "Pending"}
})


export default model("Order", orderSchema)