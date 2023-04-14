const OrderService = require('../service/OrderService');

const createOrder = async (req, res)=>{
    const createOrderRequest = req.body;
    try{
        const createdOrder = await OrderService.createOrder(createOrderRequest);
        res.status(200).json({"success" : true, "data": createdOrder});
    }catch(err){
        console.log(err);
        res.status(404).send({"success": false , "error_message": err.message});
    }
};

const getOrder = async (req, res)=>{
    const orderId = req.params.orderId;
    try{
        const getOrder = await OrderService.getOrder(orderId);
        res.status(200).json({"success" : true, "data": getOrder});
    }catch(err){
        console.log(err);
        res.status(404).send({"success": false , "error_message": err.message});
    }
};

const getOrderByIds = async (req, res)=>{
    const orderId = req.params.orderId;
    const orderItemId = req.params.orderItemId;
    try{
        const getOrder = await OrderService.getOrderByIds(orderId, orderItemId);
        res.status(200).json({"success" : true, "data": getOrder});
    }catch(err){
        console.log(err);
        res.status(404).send({"success": false , "error_message": err.message});
    }
};

module.exports = {createOrder, getOrder, getOrderByIds};