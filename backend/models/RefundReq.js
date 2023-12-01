import mongoose from "mongoose";

const Schema = mongoose.Schema;

const refundSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    prod: {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          price: {
            type: Number,
            required: true
          },
          status: {
            type: String,
            enum: ['delivered', 'pending', 'returned'],
            default: 'pending',
            required: true
          }
    }
});


const Refund = mongoose.model("Refund", refundSchema);

export default Refund;
