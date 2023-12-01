import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import {getOrders, sendEmailWithPDF, getOrdersByDateRange, getAllOrders, deleteOrder, refundProdsFromOrder,updateOrder ,createRefund, getAllRefunds} from '../controllers/orderController.js'
import Product from '../models/productmodel.js';
const orderRouter = express.Router();

orderRouter.post('/', asyncHandler(async (req, res) => {
  const {
    items,
    status,
    user,
    shippingAddress,
    paymentMethod,
    totalPrice,
    dateOrdered
  } = req.body;

  const updatedItems = items.map(async (item) => {
    const prod = await Product.findById(item.product).exec();

    const price = Number(prod.price);
    const discountRate = Number(prod.Discount_rate);

    item.price = (price * (1 - discountRate / 100)).toFixed(2);
    return item;
  });

  const updatedItemsResolved = await Promise.all(updatedItems);

  const newTotalPrice = updatedItemsResolved.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const order = new Order({
    items: updatedItemsResolved,
    status,
    user,
    shippingAddress,
    paymentMethod,
    totalPrice: newTotalPrice,
    dateOrdered
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
}));


orderRouter.get('/getOrders/:id', getOrders);
orderRouter.post('/sendPDF', sendEmailWithPDF);
orderRouter.get('/getOrdersByDateRange/:date1/:date2', getOrdersByDateRange);
orderRouter.get('/getOrders', getAllOrders);
orderRouter.post('/deleteOrder/:id', deleteOrder);
orderRouter.post('/refundProds', refundProdsFromOrder);
orderRouter.post('/createRefund', createRefund);
orderRouter.get('/getRefunds', getAllRefunds);
orderRouter.patch('/update/:id',updateOrder)

export {orderRouter};