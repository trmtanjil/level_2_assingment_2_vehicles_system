import { Request, Response } from "express";
import { userServices } from "./user.service";


const creatUser = async(req:Request, res:Response)=>{
    
    try{

        const result = await userServices.creatUser(req.body)

        res.status(200).json({
             succes:true,
    message:"Data inserted Succesfully",
    data: result.rows[0]
        })
    }catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}


 //get user
 const getUser=async(req:Request, res:Response)=>{
  const result = await userServices.getUser()
  try{
     res.status(200).json({
         success:true,
         message:'users get succesfully',
         data:result.rows
     })
  }catch(err:any){
     res.status(500).json({
         success:false,
          message:err.message,
     })
  }
  }

  //get single user
  const getsingleUser=async(req:Request, res:Response)=>{
    try{
        const result = await userServices.getSingleUser(req.params.id!)

        if(result.rows.length ===0){
            res.status(404).json({
                success:false,
                message:'user not found'
            }) 
        }else{
            res.status(200).json({
                success:true,
                message:'user fetched successfully',
                data:result.rows[0]
            })
        }
    }catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}


 export const userControllers={
    creatUser,
    getUser,
     getsingleUser
 }