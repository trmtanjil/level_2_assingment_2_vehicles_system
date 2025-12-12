import express, {   Request, Response } from "express";
import initDB from "./config/db";
import { userRouter } from "./moddules/users/user.routes";
import { vehiclesRouter } from "./moddules/vehicles/vehicles.routers";
import { authRoutes } from "./moddules/auth/auth.routes";
import auth from "./midleware/auth";
import { bookingRouter } from "./moddules/bookings/booking.routes";
 


const app = express();


//parser
app.use(express.json());
 
 
//initializing db
initDB()

//users CRUD

app.use("/api/v1/users",userRouter)
 
//  vehicles crud 
app.use("/api/v1/vehicles",vehiclesRouter)
 
//  boooking crud 
app.use("/api/v1/booking",bookingRouter)
 

//auth operation
app.use('/api/v1/auth',authRoutes)
 




app.use((req:Request, res:Response)=>{
    res.status(404).json({
        success:false,
        message:'route not found',
        path:req.path,
    })
})


export default app;