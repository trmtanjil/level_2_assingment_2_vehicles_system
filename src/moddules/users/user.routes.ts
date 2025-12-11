import express  from "express"
import { userControllers } from "./user.controller";


const router =express.Router();

//user crud
router.post("/",userControllers.creatUser)
router.get("/",userControllers.getUser)
router.get("/:id",userControllers.getsingleUser)

export const userRouter = router
