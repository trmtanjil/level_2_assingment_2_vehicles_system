import express  from "express"
import { bookingsControllers } from "./booking.controller";


const router =express.Router();

//user crud
router.post("/",bookingsControllers.creatbookings)
router.get("/",bookingsControllers.getbookings)
router.get("/:id",bookingsControllers.singlebookings)
//  router.put("/:id",userControllers.updateUser)
//  router.delete("/:id",userControllers.deleteUser)

export const userRouter = router
