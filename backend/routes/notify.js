import Router from "express";
import Wishlist from "../models/Wishlist.js";
import User from '../models/User.js'
import Product from '../models/productmodel.js';
import nodemailer from 'nodemailer';
import mongoose from "mongoose"

const notifyRouter = Router();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'ssurent2@gmail.com',
      pass: 'rqmkwjzxcgojapnj',
    }
  });

notifyRouter.get("/:productId", async (req, res) => {

try {

    const productId = new mongoose.Types.ObjectId(req.params.productId);
    const prod = await Product.findById(productId);
    const wishlists = await Wishlist.find({ 'products.productId': productId });

    console.log(wishlists);


    const emails = [];

    for (const wishlist of wishlists) {

        console.log(wishlist);

        //const userid = new mongoose.mongo.BSONPure.ObjectID.createFromHexString(wishlist.userId);

        if (mongoose.Types.ObjectId.isValid(wishlist.userId)) {
            const user = await User.findById(wishlist.userId);
        
            if (!user) {
            continue;
            }
        
            emails.push(user.email);
        }
      }
    
    emails.forEach((email) => {

        const mailOptions = {
            from: 'ssurent2@gmail.com',
            to: email,
            subject: 'Discount in your Wishlist!',
            text: `Dear valued customer, \n\n We see that you have ${prod.Pname} in your wishlist, and we have great news! It is now on sale! Would you like to checkout?\n\n Best regards,\n\n SuRent`
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email: ', error);
            } else {
              console.log('Email sent: ', info.response);
            }
          });

    });

} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
}

      //res.json(emails);

});


export {notifyRouter};