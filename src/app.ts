import express, {   Request, Response } from "express";
import initDB from "./config/db";
 


const app = express();


//parser
app.use(express.json());
 
 
//initializing db
initDB()

 

 


app.use((req:Request, res:Response)=>{
    res.status(404).json({
        success:false,
        message:'route not found',
        path:req.path,
    })
})


export default app;