import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {createError} from "../error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body, password: hash});

        await newUser.save();

        return res
            .status(201)
            .json({msg: "User saved successfully", user: newUser});
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({name: req.body.name})
        if (!user) return next(createError(404, "User not found"))

        const passwordCheck = await bcrypt.compare(req.body.password, user.password)

        if (!passwordCheck) return next(createError(400, "Wrong credentials"))

        const token = await jwt.sign({id: user._id}, process.env.SECRET_KEY)
        const {password, ...otherUserDetails} = user._doc

        return res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({msg: "User signed in successfully", user: otherUserDetails})
    } catch (error) {
        next(error);
    }
};