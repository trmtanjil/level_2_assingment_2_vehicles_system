import express  from "express"
import { bookingsControllers } from "./booking.controller";
import auth from "../../midleware/auth";


const router =express.Router();

//user crud
router.post("/",auth("admin"),bookingsControllers.createBooking)
router.get("/",auth("admin", "customer"),bookingsControllers.getBookings)
router.put("/:bookingId", auth("admin", "customer"), bookingsControllers.updateBookingController);
 
export const bookingRouter = router
