import express  from "express"
import { userControllers } from "./user.controller";


const router =express.Router();

//user crud
router.post("/",userControllers.creatUser)
router.get("/",userControllers.getUser)
router.get("/:id",userControllers.getsingleUser)
 router.put("/:id",userControllers.updateUser)
 router.delete("/:id",userControllers.deleteUser)

export const userRouter = router
