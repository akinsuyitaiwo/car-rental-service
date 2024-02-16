import jwt from "jsonwebtoken";
import models from "../models/index.js";

const verifyUser = async(req, res, next) =>{
    try {
        if (req.headers && req.headers.authorization) {
            const parts = req.headers.authorization.split(" ");
            if (parts.length !== 2) {
                return res.status(403).send({ message: "Invalid Authorization format" })
            }
            let scheme = parts[0];
            let token = parts[1];
            if (!/^Bearer$/i.test(scheme)) {
                return res.status(403).send({ auth: false, message: `Bad authorization type ${scheme}` });
            }
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const user = await models.User.findById(decodedToken._id)
            if(!user){
                return res.status(404).send(
                   {messsage : "User not found"} 
                )
            }
            req.user = user;
            next();
        } else {
            return res.status(403).send({auth:false,message:"No Token Provided"})
        }
    } catch (error) {
        console.error("Error from verify user middleware", error.message)
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}
const verifyRider = async(req, res, next) =>{
    try {
        const {_id} = req.user;
        const rider = await models.User.findOne({_id, role: "Rider"});
        if(!rider){
            return res.status(401).send({
                message: "Unauthorized access"
            });
        }
        next();
    } catch (error) {
        console.error("Error from verify rider middleware", error.message)
        return res.status(500).send({
            message: "Internal server error",
        });
    }
}
export {verifyRider, verifyUser}