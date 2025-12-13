import express  from "express"
import { userControllers } from "./user.controller";
import auth from "../../midleware/auth";


const router =express.Router();

//user crud
router.post("/",userControllers.creatUser)
router.get("/",auth("admin"),userControllers.getUser)
router.get("/:id",userControllers.getsingleUser)
 router.put("/:id",auth("admin"),userControllers.updateUser)
 router.delete("/:id",auth("admin"),userControllers.deleteUser)

export const userRouter = router
