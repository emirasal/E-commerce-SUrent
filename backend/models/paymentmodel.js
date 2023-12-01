
import mongoose from "mongoose"
const schema = mongoose.Schema;

const paymentMethodSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['credit-card', 'debit-card', 'paypal', 'google-pay', 'apple-pay'],
    default: 'credit-card',
    required: true
  },
  cardHolderName: {
    type: String,
    required: function() {
      return this.method === 'credit-card' || this.method === 'debit-card';
    }
  },
  cardNumber: {
    type: String,
    required: function() {
      return this.method === 'credit-card' || this.method === 'debit-card';
    }
  },
  expiry: {
    type: Number,
    required: function() {
      return this.method === 'credit-card' || this.method === 'debit-card';
    }
  },
  cvc: {
    type: String,
    required: function() {
      return this.method === 'credit-card' || this.method === 'debit-card';
    }
  },
  paypalEmail: {
    type: String,
    required: function() {
      return this.method === 'paypal';
    }
  },
  googlePayEmail: {
    type: String,
    required: function() {
      return this.method === 'google-pay';
    }
  },
  applePayEmail: {
    type: String,
    required: function() {
      return this.method === 'apple-pay';
    }
  }
})

export default paymentMethodSchema;
