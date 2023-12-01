import mongoose, { mongo } from "mongoose";

const dbConnect = () => {
    const connectionParams = {useNewUrlParser:true};
    mongoose.connect(process.env.DB, connectionParams);

    mongoose.connection.on("connected", ()=> {
        console.log("Connected to database");
    });

    mongoose.connection.on("error", (err)=>{
        console.log("Error while connecting to database");
    });

    mongoose.connection.on("disconnected", ()=> {
        console.log("Disconnected from db");
    });

};

export default dbConnect;