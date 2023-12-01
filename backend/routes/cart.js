import {Router} from "express";
import Cart from "../models/Cart.js";
import cors from "cors";

const router = Router();


router.post("/addToCart", cors(), async (req, res) => {
    try {
        const userId = req.header('userId');
        const productId = req.body.productId;

        let cart = await Cart.findOne({userId: userId});

        if (!cart) {
            cart = await Cart.create({userId: userId, products: []});
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
        } else {
            cart.products.push({productId: productId, quantity: 1});

        }

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});


router.post("/removeFromCart", cors(), async (req, res) => {
    try {
        const userId = req.header('userId');
        const productId = req.body.productId;

        let cart = await Cart.findOne({userId: userId});

        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).send('Product Not Found');
        }

        const product = cart.products[productIndex];

        if (product.quantity > 1) {
            product.quantity--;
        } else {
            cart.products.splice(productIndex, 1);
        }

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});

router.get("/carts", cors(), async (req, res) => {
    try {
        const userId = req.header('userId');
        let cart = await Cart.findOne({userId: userId});
        if (!cart) {
            cart = await Cart.create({userId: userId});
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});


router.post("/incrementQuantity", cors(), async (req, res) => {
    try {
        const userId = req.header('userId');
        const productId = req.body.productId;

        let cart = await Cart.findOne({userId: userId});

        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).send('Product Not Found');
        }

        const product = cart.products[productIndex];

        product.quantity++;

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});


router.post("/decrementQuantity", cors(), async (req, res) => {
    try {
        const userId = req.header('userId');
        const productId = req.body.productId;

        let cart = await Cart.findOne({userId: userId});

        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).send('Product Not Found');
        }

        const product = cart.products[productIndex];

        if (product.quantity > 1) {
            product.quantity--;
        } else {
            cart.products.splice(productIndex, 1);
        }

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});


router.post("/updateCartUserId", cors(), async (req, res) => {
    try {
        const cartId = req.body.cartId;
        const userId = req.header('userId');
        console.log(cartId)

        let cart = await Cart.findById(cartId);

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        await Cart.deleteMany({userId: userId});
        cart.userId = userId;

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});


export default router;