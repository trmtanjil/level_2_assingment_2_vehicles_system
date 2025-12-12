import express  from "express"
import { bookingsControllers } from "./booking.controller";


const router =express.Router();

//user crud
router.post("/",bookingsControllers.createBooking)
router.get("/",bookingsControllers.getBookings)
router.get("/:id",bookingsControllers.getSingleBooking)
//  router.put("/:id",userControllers.updateUser)
//  router.delete("/:id",userControllers.deleteUser)

export const bookingRouter = router
