 import {  Request, Response } from "express";
import { authServices } from "./auth.service";
import { userControllers } from "../users/user.controller";

const registerUser = async (req:Request, res:Response) => {
    try{
        
        const createNewUser = await userControllers.creatUser(req,res);

        return res.status(201).json({
            message:"Successfully user created!!",
            data:createNewUser
        })

    }catch(err:any){
        res.status(500).json({
            message:"Server error when register",
            error:err.message
        })
    }
}



const loginUser = async (req:Request, res:Response)=>{
    const {email, password}=req.body
    

    try{
    const result = await authServices.loginUser(email,password);
    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
    
     
    }catch(err:any){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}


export const authController={
    registerUser,
    loginUser,
    
}