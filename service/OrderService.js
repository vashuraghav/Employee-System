const OrderRepo = require('../repo/OrderRepo');

const createOrder = async (createOrderRequest)=>{
    try{
        const order = await OrderRepo.createOrder(createOrderRequest);
        return order;
    }catch(err){
        console.log(err);
        throw new Error("Order Creation Failure");
    }
}

const getOrder = async (orderId)=>{
    try{
        const order = await OrderRepo.getOrderbyOrderId(orderId);
        return order;
    }catch(err){
        console.log(err);
        throw new Error("Get Order Failure");
    }
}

const getOrderByIds = async (orderId, orderItemId)=>{
    try{
        const order = await OrderRepo.getOrderbyOrderItemId(orderId, orderItemId);
        return order;
    }catch(err){
        console.log(err);
        throw new Error("Get Order Failure");
    }
}

module.exports = {createOrder, getOrder, getOrderByIds};