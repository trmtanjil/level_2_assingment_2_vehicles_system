 
import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";



// const auth = (...roles: string[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const authHeader = req.headers.authorization;
//       console.log("AUTH HEADER =>", authHeader);

//       if (!authHeader) {
//         return res.status(401).json({
//           success: false,
//           message: "Authorization header missing",
//         });
//       }

//       const [type, token] = authHeader.split(" ");

//       if (type !== "Bearer" || !token) {
//         return res.status(401).json({
//           success: false,
//           message: "Invalid token format",
//         });
//       }

//       const decoded = jwt.verify(
//         token,
//         config.jwtSecret as string
//       ) as JwtPayload;

//       req.user = decoded;

//       if (roles.length && !roles.includes(decoded.role as string)) {
//         return res.status(403).json({
//           success: false,
//           message: "Forbidden access",
//         });
//       }

//       next();
//     }catch (err: any) {
//   console.error("JWT ERROR =>", err);

//   return res.status(401).json({
//     success: false,
//     message: err?.message || "Invalid or expired token",
//   });
// }
//   };
// };


const auth = (...roles:string[])=>{
    return async (req:Request, res:Response, next:NextFunction)=>{
    try{
        const token = req.headers.authorization;
        console.log('token jwt', token)
        if(!token){
            return res.status(401).json({
                success: false,
                message:'You are not authorized! (Token Missing)'
            })
        }
        if(!token){
            return res.status(500).json({message:'You are not allowed!!'})
        }

const tokenheader  =  token.split(" ")[1];

        const decoded = jwt.verify(tokenheader as string, config.jwtSecret as string) as JwtPayload;
        console.log({decoded})
        req.user = decoded;
 
        if(roles.length && !roles.includes(decoded.role as string)){
            return res.status(500).json({
                error:"unauthorized!!"
            })
        }
         next();
        }catch(err:any){
            res.status(500).json({
                success:false,
                message:err.message,
            })
    }
    }
}
export default auth;