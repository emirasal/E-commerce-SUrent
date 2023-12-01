import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
		type: String,
		required: true,
	},
    surname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
    phone: {
		type: String,
		required: true,
	},
    address: {
		type: String,
		required: true,
	},
    taxId: {
		type: String,
		required: true,
	},
	roles: {
		type: [String],
		enum: ["user", "sales_man", "prod_man"],
		default: ["user"],
	},
});

const User = mongoose.model("User", userSchema);

export default User;