import jwt from "jsonwebtoken"

const secret = process.env.SECRET_KEY
const generateToken = async(payload, secretKey= secret)=>{
    const token = await jwt.sign(payload, secretKey,{expiresIn: '1h'})
    return token;
}

export default generateToken;