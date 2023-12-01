import {Router} from "express";
import cors from "cors";
import Wishlist from "../models/Wishlist.js";

const router = Router();


router.post("/addToWishlist", cors(), async (req, res) => {
    try {
        const userId = req.header('userId');
        const productId = req.body.productId;

        let wishlist = await Wishlist.findOne({userId: userId});

        if (!wishlist) {
            wishlist = await Wishlist.create({userId: userId, products: []});
        }

        const productIndex = wishlist.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex !== -1) {
            return res.status(404).send('Already added!');
        } else {
            wishlist.products.push({productId: productId});
        }

        await wishlist.save();

        res.status(200).json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});


router.post("/removeFromWishlist", cors(), async (req, res) => {
    try {
        const userId = req.header('userId');
        const productId = req.body.productId;

        let wishlist = await Wishlist.findOne({userId: userId});

        if (!wishlist) {
            return res.status(404).send('Wishlist not found');
        }

        const productIndex = wishlist.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).send('Product Not Found');
        }

        const product = wishlist.products[productIndex];

        wishlist.products.splice(productIndex, 1);
    
        await wishlist.save();

        res.status(200).json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});

router.get("/wishlists/:id", cors(), async (req, res) => {
    try {
        const {id} = req.params
        //const userId = req.header('userId');
        let wishlist = await Wishlist.findOne({userId: id});
        if (!wishlist) {
            wishlist = await Wishlist.create({userId: id});
        }
      
        res.status(200).json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});


router.post("/updateCartUserId", cors(), async (req, res) => {
    try {
        const wishlistId = req.body.wishlistId;
        const userId = req.header('userId');
        console.log(wishlistId)

        let wishlist = await Wishlist.findById(wishlistId);

        if (!wishlist) {
            return res.status(404).send("Wishlist not found");
        }

        await Wishlist.deleteMany({userId: userId});
        wishlist.userId = userId;

        await wishlist.save();

        res.status(200).json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});


export default router;