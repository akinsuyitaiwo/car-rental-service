import models from "../models/index.js"
import validateCreateOrder from "../validations/order.js";




const createOrder = async(req,res) =>{
    const {_id} = req.user
    try {
        const user = await models.User.findById(_id)
        if(!user){
            return res.status(404).send("user does not exist")
        }
        if(user.role !== "Sender"){
            return res.status(403).send("Only Sender can make an order")
        }
        const {error, value} = validateCreateOrder(req.body);
        if(error){
        return res.status(400).json(error.message)
        }
        const {senderLocation, recipientLocation, price} = value;
        const order = await models.Order.create({
            sender : _id,
            senderLocation,
            recipientLocation,
            price
        });
        await models.Notification.create({
            message: `${user.username} has created a new Order`,
        })
        return res.status(201).json({
            data :order,
            message: "order created successfully"
        })
    } catch (error) {
        console.error("error from creating order", error.message)
        return res.status(500).json("server error")
    }
}

const getOrders = async (req, res) =>{
    try {
        const  orders = await models.Order.find()
                                .populate('sender', 'username')
                                .sort('-createdAt');
        if(orders < 1){
            return res.status(404).json("No orders found")
        }                        
        return res.status(200).json({data :orders , message:"orders fetched succesfully"})
    } catch (error) {
        console.error("error in getting orders", error.message)
        return res.status(500).send({
            message: "server error"
        })
    }
}

export {createOrder, getOrders};