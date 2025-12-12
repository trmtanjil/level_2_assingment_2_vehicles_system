import { Request, Response } from "express";
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

export const vehiclesControllers={
    creatvehicles
}