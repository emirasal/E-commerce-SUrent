import Order from '../models/Order.js'
import User from '../models/User.js'
import Refund from '../models/RefundReq.js';
import Product from '../models/productmodel.js';
import nodemailer from 'nodemailer';
import fs from 'fs'
import mongoose from "mongoose"

//get all orders of user
const getOrders = async (req,res)=>{
    try {
        const {id} = req.params //gives us the id that we type.

        const tuser = await User.findById(id);
        if(!tuser){
            return res.status(404).json({error:"No corresponding user with given id."})
        }
        const userOrders = await Order.aggregate([
            { $match : { user : { $eq : tuser._id } } },
            { $project: {

                items: 1,
                status: 1,
                user: 1,
                shippingAddress: 1,
                paymentMethod: 1,
                totalPrice: 1,
                dateOrdered: 1
            }
            }
        ]
        );
        
        
        if (!userOrders.length) {
            return res.status(200).json({ error: "No orders with matching id found." });
          }
      
          res.status(200).json(userOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}



const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: 'ssurent2@gmail.com',
    pass: 'rqmkwjzxcgojapnj',
  }
});

const sendEmailWithPDF = async (req, res) => {

  const {userEmail, pdfBase64} = req.body;

  const mailOptions = {
    from: 'ssurent2@gmail.com',
    to: userEmail,
    subject: 'Invoice PDF',
    attachments: [
      {
        filename: 'Invoice.pdf',
        content: Buffer.from(pdfBase64, 'base64'),
        contentType: 'application/pdf',
        disposition: 'inline'
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
};


const getOrdersByDateRange = async (req,res)=>{
  try {
      const { date1, date2 } = req.params //gives us the id that we type. 
      
      const dateOrders = await Order.aggregate([
          { $match : { dateOrdered: { $gte: new Date(date1), $lte: new Date(date2) } } },
          { $project: {
              status: 1,
              totalPrice: 1,
              dateOrdered: 1
          }
          }
      ]
      );
      if (!dateOrders.length) {
          return res.status(200).json({ error: "No orders found between given dates." });
        } 
    
      res.status(200).json(dateOrders); 
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
}

//get all orders
const getAllOrders = async(req,res)=>{
  const orders = await Order.find({}).sort({dateOrdered:-1}) //leave blank since we want all.

  res.status(200).json(orders)
}


//delete product
const deleteOrder = async(req,res) =>{
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such order"})
  }

  const order = await Order.findOneAndDelete({_id: id})
  if(!order){
    return res.status(404).json({error:"No corresponding order with given id."})
  }
  res.status(200).json(order);
}

const refundProdsFromOrder = async (req, res) => {
  const {refundId} = req.body; // Assuming the array of products is provided in the request body
  const refund = await Refund.findById(refundId);
  try {
      // Find the product by its ID
      const prodd = await Product.findById(refund.prod.product);
      // Add the refunded quantity back to the product stock
      prodd.stock = prodd.stock + Number(refund.prod.quantity)+1;
      
      // Save the updated product
      await prodd.save();
      
      refund.prod.status = 'returned'



      const orderr = await Order.findById(refund.order);
      orderr.items.forEach(element => {
        if (String(element.product)==String(refund.prod.product)) {
          element.status = 'returned';

        }
      });
      await orderr.save();
      await refund.save();
      // Return a success response
    res.json({ message: 'Products refunded successfully' });

    const user = await User.findById(orderr.user)

    const mailOptions = {
      from: 'ssurent2@gmail.com',
      to: user.email,
      subject: 'About Your Refund Request',
      text: `Dear valued customer, \n\n Your refund request for the ${prodd.Pname} from your order ${orderr._id} is accepted. Total amount that was refunded is $ ${refund.prod.price}\n\n Best regards,\n\n SuRent`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email: ', error);
      } else {
        console.log('Email sent: ', info.response);
      }
    });

    }
  catch (error) {
    // Handle any errors that occur during the refund process
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createRefund = async (req, res) => {
  const {
    order,
    prod,
  } = req.body;
  const refund = new Refund({
    order,
    prod,
  });
  const orderr = await Order.findById(order);
  const product = await Product.findById(prod.product);
  product.stock +=1;
  await product.save()
  orderr.items.forEach(element => {
    if (element.product==prod.product) {
      element.status = 'pending';
    }
  });
  await orderr.save();
  const createdRefund = await refund.save();
  res.status(201).json(createdRefund);

}

//get all refunds
const getAllRefunds= async(req,res)=>{
  const refunds = await Refund.find({}) //leave blank since we want all.
  res.status(200).json(refunds)
}

//update a product
const updateOrder= async(req,res) =>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No such product"})
  }

  const order = await Order.findOneAndUpdate({_id:id},{...req.body}) //spread is used since we dont know how many field to update.
  if(!order){
    return res.status(404).json({error:"No corresponding order with given id."})
  }
  res.status(200).json(order);

}

export {getOrders, sendEmailWithPDF, getOrdersByDateRange, getAllOrders, deleteOrder, refundProdsFromOrder, createRefund, getAllRefunds, updateOrder}