import mongoose from "mongoose";

const Schema = mongoose.Schema;

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        }
    ]
});


const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
