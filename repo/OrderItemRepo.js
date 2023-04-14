const OrderItemSchema  = require("../models/OrderItemSchema");

const createOrderItems = async(orderItems)=> {
    const createdOrderItems = await OrderItemSchema.insertMany(orderItems);
    return createdOrderItems;
}

module.exports = {createOrderItems}