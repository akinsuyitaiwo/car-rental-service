/* eslint-disable no-empty */
import models from "../models/index.js";
import validations from "../validations/index.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/token.js"


const {validateSignUpUser, validateSignInUser} = validations

const signUpUser = async (req,res) => {
    try {
        const {error, value} = validateSignUpUser(req.body)
        if(error){
            return res.status(400).json(error.message);
        }
        const {username, password, role}= value
        const userExist = await models.User.findOne({username});
        if(userExist){
            return res.status(409).send("user already exists")
        }
        const hashPassword = await bcrypt.hash(password,10);
        await models.User.create({
            username, password: hashPassword, role
        })
        return res.status(201).json({
            status:true,
            message:`${role} account created for ${username}`
        })
    } catch (error) {
        console.error("error from signup controller", error.message)
        return res.status(500).send({
            message: "Server error"
        });
    }
}

const signInUser = async(req,res) =>{
    try {
        const {error, value} = validateSignInUser(req.body);
        if(error) {
            return res.status(400).json(error.message)
        }
        const { username, password} = value
        const  user = await models.User.findOne({username});
        if(!user){
            return res.status(401).json("Invalid Username. Please input a valid username");
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.status(401).json("Password incorrect. Please input the correct password.")
        }
        const token = await generateToken({_id: user._id, username})
        return res.status(200).json({
            status: true,
            token,
            message:`${username} signed in successfully`})
    } catch (error) {
        console.error("error from signin controller", error.message)
        return res.status(500).send({
            message: "Server error"
        })
    }
}


export  {signUpUser, signInUser}