import { Schema, model} from "mongoose";

const senderSchema = new Schema({
    username : {type : String}
})

export default model("Sender", senderSchema)