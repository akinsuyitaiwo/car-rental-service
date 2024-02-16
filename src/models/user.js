import { Schema, model} from "mongoose";

const userSchema = new Schema(
    {
        username : {
            type : String,
            unique: true
        },
        password: {
            type: String
        },
        role: {
            type: String,
            enum: ["Rider", "Sender"]
        }
},
{
    timestamps: true
});

export default model("User", userSchema)