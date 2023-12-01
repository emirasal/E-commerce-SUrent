/*the product model*/

import mongoose from "mongoose"
const schema = mongoose.Schema;


//pass object as argument, this is our schema.
const productSchema = new mongoose.Schema({
    Pname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    variants:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required:false
    },
    warranty: {
        type: Number,
        min: 0,
        max: 365,
        default: 30,
        required: false
    },
    Distribution_inf: {
        type:String,
        required:false
    },
    Discount_rate:{
        type:Number,
        default: 0,
        required:false
    },
    category:{
        type:String,
        required:false
    },
    images: {
        type: Array,
        default: []
    },
    rating:{
      type:Number,
      min: 0,
      max: 5,
      default: 0,
      required: false  
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: 
    [
        {
            approved: {
                type: Boolean,
                default: false
            },
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            user_name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
},{timestamps:true})


const Product = mongoose.model("Product", productSchema);

export default Product;
//module.exports = mongoose.model('Product',productSchema);
