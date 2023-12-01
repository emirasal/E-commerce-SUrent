import {Router} from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateTokens from "../utils/generateTokens.js";
import {logInBodyValidation, signUpBodyValidation,} from "../utils/validationSchema.js";
import cors from "cors";

const router = Router();

// signup
router.post("/signUp", cors(), async (req, res) => {
	try {
		const {error} = signUpBodyValidation(req.body);
		if (error)
			return res
				.status(400)
				.json({error: true, message: error.details[0].message});

		const user = await User.findOne({email: req.body.email});
		if (user)
			return res
				.status(400)
				.json({error: true, message: "User with given email already exist"});

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({...req.body, password: hashPassword}).save();

		res
			.status(201)
			.json({error: false, message: "Account created sucessfully"});
	} catch (err) {
		console.log(err);
		res.status(500).json({error: true, message: "Internal Server Error"});
	}
});

// login
router.post("/logIn", cors(), async (req, res) => {
	try {
		const {error} = logInBodyValidation(req.body);
		if (error)
			return res
				.status(400)
				.json({error: true, message: error.details[0].message});

		const user = await User.findOne({email: req.body.email});
		if (!user)
			return res
				.status(401)
				.json({error: true, message: "Invalid email or password"});

		const verifiedPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!verifiedPassword)
			return res
				.status(401)
				.json({error: true, message: "Invalid email or password"});

		const {accessToken, refreshToken} = await generateTokens(user);
		res.status(200).json({
			error: false,
			accessToken,
			refreshToken,
			userId: user.id,
			refreshToken,
			message: "Logged in sucessfully",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({error: true, message: "Internal Server Error"});
	}
});

//for checking admin login 
router.post("/logInAdmin", cors(), async (req, res) => {
    try {
        const {error} = logInBodyValidation(req.body);
        if (error)
            return res
                .status(400)
                .json({error: true, message: error.details[0].message});

        const user = await User.findOne({email: req.body.email});
        if (!user)
            return res
                .status(401)
                .json({error: true, message: "Invalid email or password"});

        const verifiedPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!verifiedPassword)
            return res
                .status(401)
                .json({error: true, message: "Invalid email or password"});

        // Check if user has 'prod_man' or 'sales_man' role
        if (!user.roles.includes('prod_man') && !user.roles.includes('sales_man')) 
            return res
                .status(403)
                .json({error: true, message: "You are not admin"});

        const {accessToken, refreshToken} = await generateTokens(user);
        res.status(200).json({
            error: false,
            accessToken,
            refreshToken,
            userId: user.id,
            refreshToken,
            message: "Logged in successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: true, message: "Internal Server Error"});
    }
});


export default router;
