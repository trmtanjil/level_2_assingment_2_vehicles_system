import express, {   Request, Response } from "express";
import initDB from "./config/db";
import { userRouter } from "./moddules/users/user.routes";
 


const app = express();


//parser
app.use(express.json());
 
 
//initializing db
initDB()

//users CRUD

app.use("/api/v1/users",userRouter)
 
 

 


app.use((req:Request, res:Response)=>{
    res.status(404).json({
        success:false,
        message:'route not found',
        path:req.path,
    })
})


export default app;