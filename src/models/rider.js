import mongoose, { Schema, model } from "mongoose";

const riderSchema = new Schema ({
    rider:{ type: mongoose.Schema.Types.ObjectId, ref: "recipient"},
    orderRequests:{ type: String, enum: ["Accept", "Decline", "Pending"], default: "Pending"}
})

export default model("Rider", riderSchema)