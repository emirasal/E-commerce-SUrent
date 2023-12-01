import mongoose from "mongoose"
import Product from './productmodel.js';
import paymentMethodSchema from './paymentmodel.js';

const schema = mongoose.Schema;

const orderItemSchema = new mongoose.Schema({
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
    default: 'delivered',
    required: true
  }
})

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  status: {
    type: String,
    enum: ['processing', 'in-transit', 'delivered','cancelled'],
    default: 'processing',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shippingAddress: {

    fullName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true }
  },
  paymentMethod: {
    paymentMethodSchema,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
    required: true
  }
})

orderSchema.pre('save', async function (next) {
    await this.calculateTotalCost();
    await this.updateStockNumbers();
    next();
  });

// Define the schema methods
orderSchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus;
  return this.save();
};

orderSchema.methods.calculateTotalCost = function() {
  let totalCost = 0;
  for (let item of this.items) {
    totalCost += item.quantity * item.price;
  }
  this.totalPrice = totalCost;
};

orderSchema.methods.getItemsList = function() {
  let itemsList = [];
  for (let item of this.items) {
    itemsList.push(item.product);
  }
  return itemsList;
};

orderSchema.methods.updateStockNumbers = async function() {
  for (let item of this.items) {
    const product = await Product.findById(item.product);
    product.stock -= item.quantity;
    await product.save();
  }
};



const Order = mongoose.model("Order", orderSchema);
const OrderItem = mongoose.model("OrderItem", orderItemSchema);
export default Order;
