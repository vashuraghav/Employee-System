const OrderSchema  = require("../models/OrderSchema");
const OrderItemRepo  = require("./OrderItemRepo");

const createOrder = async(order)=> {
    const orderItems = await OrderItemRepo.createOrderItems(order['items']);
    const orderItemIds = orderItems.map((orderItem) => orderItem._id);
    order['items'] = orderItemIds;
    const newOrder = new OrderSchema(order);
    return await newOrder.save();
}

const getOrderbyOrderId = async(orderId)=> {
    const order = await OrderSchema.findOne({ _id: orderId}).populate('user')
    return order;
}

const getOrderbyOrderItemId = async(orderId, orderItemId)=> {
    const order = await OrderSchema.findOne({ _id: orderId, 'items': orderItemId })
      .populate('user')
      .populate({
        path: 'items',
        populate: {
          path: 'reseller',
          model: 'User'
        }
      });
    return order;
}

module.exports = {createOrder, getOrderbyOrderItemId, getOrderbyOrderId}