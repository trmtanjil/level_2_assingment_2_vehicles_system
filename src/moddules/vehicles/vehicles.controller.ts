import {   Request, Response } from "express";
import { vahiclesServices } from "./vihicles.service";

const creatvehicles=async(req:Request,res:Response)=>{
    try{
const result =await vahiclesServices.creatVihicles(req.body)
res.status(200).json({
    success:true,
    message:"Vihicles inserted Succesfully",
    data:result.rows[0]
})
    }catch(err:any){
          res.status(500).json({
            success:false,
            message:err.message
          })
    }
}



// get vehicles 
const getVehicles= async(req:Request,res:Response)=>{
    
    try{
        const result = await vahiclesServices.getVehicles()
       res.status(200).json({
         success:true,
         message:'vehicles get succesfully',
         data:result.rows
     })
    }catch(err:any){
          res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

// get single vehicles 
const singleVehicles = async(req:Request,res:Response)=>{
    try{
        const result = await vahiclesServices.singleVehicles(req.params.id!)
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
    }
    
    catch(err:any){
          res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

// vehiclesUpdated 
const updateVehicles =async(req:Request, res:Response)=>{
     const payload = {
      ...req.body,
      id: req.params.id, // <-- এখানে id পাঠানো বাধ্যতামূলক
    };
     try{
        const result = await vahiclesServices.updateVehicles(payload)

        if(result.rows.length===0){
            res.status(400).json({
                 success:false,
                 message:'vehicles not found'
            })
        }else{
               res.status(200).json({
                 success:true,
                 message:'vehicles updated successfully',
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

// delet vehicles 
const deletvahicles=async(req:Request,res:Response)=>{
    const {id}=req.params;
    try{
        const result = await vahiclesServices.deletvahicles(id!)
    
    if(result?.rows.length==0){
         res.status(404).json({
                 success:false,
                 message:'vehicles not found'
             }) 
    }else{
        res.status(200).json({
                 success:true,
                 message:'vehicles delete successfully',
                 data:result
             }) 
    }
    }catch(err:any){
         res.status(500).json({
             success:false,
             message:err,
         })
    }
}

export const vehiclesControllers={
    creatvehicles,
    getVehicles,
    singleVehicles,
    updateVehicles,
    deletvahicles,
}