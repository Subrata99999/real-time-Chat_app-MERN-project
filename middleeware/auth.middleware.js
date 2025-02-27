import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {request} from "express";

export const protectRoute = async (req,resizeBy,next) =>{
    try {
       const token = res.cookies.jwt

       if(!token){
        return res.status(401).json({ message: "unauthorized - No Token Provided"});
       }

        const decoded = jwt.verify(token, Process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({ message: "unauthorized - No Token Provided"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user)
            return res.status(401).json({ message: "User Not Found"});

        req.user = user

        next()

    } catch (error) {
    
     res.status(500).json({ message: "Internal server error"});        
    }
}