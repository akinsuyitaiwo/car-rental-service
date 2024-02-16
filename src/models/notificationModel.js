import { Schema, model } from "mongoose";

const notificationSchema = new Schema ({
    recipient : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Read", "Unread"],
        default: "Unread"
    }

}, 
{ timestamps: true });

export default model ("notification",notificationSchema)