import models from "../models/index.js"
import {validateCreateOrder, validateOrderResponse} from "../validations/order.js";




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

const getOrderById = async (req, res) => {
    try {
        const {orderId}= req.params;
        const {_id} = req.user
        const user = await models.User.findById({_id})
        if(!user){
            return res.status(404).send("user does not exist")
        }
        const order = await models.Order.findById({_id :orderId}).lean();
        if(user._id != order.sender.toString()){
            return res.status(404).send({
                message: "Order does not exist"
            });
        }
        if(!order){
            return res.status(404).send({
                message:'Order not found.'
            });
        }
        return res.status(200).send({
            data : order,
            message :"order fetched successfully"
        })
    } catch (error) {
        console.error("Error in getting order by id ", error.message);
     return res.status(404).send({
        message: "server error"
     })   
    }
}

const orderResponse = async (req, res) => {
    try {
        const {orderId}= req.params;
        const {_id} = req.user 
        const user = await models.User.findById(_id);
        if(user.role !== 'Rider') {
            return res.status(403).send({
                message: "You are not authorized to perform this action."
            });
        }
        const order = await models.Order.findById({_id: orderId});
        if(!order){
            return res.status(404).send({
                message:'Order does not exist.'
            });
        }
        const{error, value} = validateOrderResponse(req.body)
        if(error){
            return res.status(400).send(error.message)
        }
        const {response} = value;
        if(response === "Accept"){
            order.status = "Accepted"
            order.expired = true;
            order.rider =  _id;
            order.save();
            return res.status(200).send({
                message: "Order accepted"
            });
        }
        if(response === "Decline"){
            order.status = "Declined"
            order.expired = true
            order.save();
            return res.status(200).send({
                message: "Order decline"
            });
        }
        return res.status(200).send({
            message:"Order modified successfully",
        })
        
    } catch (error) {
        console.error("Error in getting order response ", error.message);
        return res.staus(404).send({
            message:"Server Error"
        })
    }
}

export {createOrder, getOrders, getOrderById, orderResponse};