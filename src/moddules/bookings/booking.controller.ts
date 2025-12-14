import { Request, Response } from "express";
import { bookingsServices } from "./booking.services";

const createBookingController = async (req: Request, res: Response) => {
  try {
    const user = req.user; // auth middleware 
    if (!user || !user.id) { 
            return res.status(401).json({
                success: false,
                message: "Authentication failed. User ID is missing in token or request."
            });
        }
    const { vehicle_id, rent_start_date, rent_end_date } = req.body;

    const booking = await bookingsServices.createBooking(
      user,
      vehicle_id,
      rent_start_date,
      rent_end_date
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getBookings = async (req:Request,res:Response)=>{
  try {
    const user = req.user; // auth middleware 
    if (!user || !user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. User ID is missing in token or request."
      });
    }

    const bookings = await bookingsServices.getBookings(user);

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
}
const updateBookingController = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const bookingId = parseInt(req.params.bookingId!);
    const { status } = req.body;

    if (!user || !user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. User ID is missing in token or request."
      });
    }

    const updatedBooking = await bookingsServices.updateBookingStatus(user, bookingId, status);

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: updatedBooking
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};


export const bookingsControllers = {
  createBooking: createBookingController,
  getBookings,
updateBookingController
};
