import express from "express";
import { config } from "dotenv";
import dbConnect from "./dbConnect.js";
import authRoutes from "./routes/auth.js";
import refreshTokenRoutes from "./routes/refreshToken.js";
import userRoutes from "./routes/users.js"; //usersRoleCheck
import {router} from "./routes/productsRoutes.js";
import cartRoutes from "./routes/cart.js";
import {orderRouter} from "./routes/orderRouter.js";
import wishlistRoutes from "./routes/wishlist.js";
import { notifyRouter } from "./routes/notify.js";
import cors from 'cors';
const app = express();

var corsOption = {
    origin : "http://localhost:3000",
    optionSuccessStatus: 200
}
config();
dbConnect();
app.use(cors(corsOption));

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", router);
app.use("/api", cartRoutes);
app.use("/api/orders", orderRouter);
app.use("/api", wishlistRoutes);
app.use("/api/notify", notifyRouter);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;