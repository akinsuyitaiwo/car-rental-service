/* eslint-disable no-empty */
import models from "../models";
import { validateSignUpSender, validateSignInSender } from "../validations/sender";
import bcrypt from "bcrypt";



export const signUpSender = async (req,res) => {
    try {
        const valid = validateSignUpSender(req.body)
        if(valid.error){
            return (res, 400, valid.error.message);
        }
        const {username, password} = req.body
        const ifSenderExist = await models.findOne({username});
        if(ifSenderExist){
            return (res, 409, "User already exist")
        }
        const hashPassword = await bcrypt.hash(password,10);
        const sender = await models.user.create({
            username, password: hashPassword,
        })
        res.status(201).json(sender)
        return res.status(200).message(`${username} signed in successfully`)
    } catch (error) {
        return (res, 500, "Server error")
    }
}

export const SignInSender = async(req,res) =>{
    try {
        const valid = validateSignInSender(req.body);
        if(valid.error) {
            return res.status(400).json(valid.error.message)
        }
        const { username, password} = req.body
        //checking the user is in database or not
        const  sender = await models.findOne({username});
        if(!sender){
            return res.status(401).json("Invalid Username. Please input a valid username");
        }
        const validPassword = await bcrypt.compare(password, validPassword)
        if(!validPassword){
            return res.status(401).json("Password incorrect. Please input the correct password.")
        }
        return res.status(200).message(`${username} signed in successfully`)
    } catch (error) {
        return (res, 500, "Server error")
    }
}