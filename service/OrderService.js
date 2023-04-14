const OrderRepo = require('../repo/OrderRepo');

const createOrder = async (createOrderRequest)=>{
    const order = await OrderRepo.createOrder(createOrderRequest);
    return order;
}

const getOrder = async (orderId)=>{
    const order = await OrderRepo.getOrderbyOrderId(orderId);
    return order;
}

const getOrderByIds = async (orderId, orderItemId)=>{
    const order = await OrderRepo.getOrderbyOrderItemId(orderId, orderItemId);
    return order;
}

module.exports = {createOrder, getOrder, getOrderByIds};