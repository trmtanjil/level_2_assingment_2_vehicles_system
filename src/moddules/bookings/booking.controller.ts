import { Request, Response } from "express";
import { bookingsServices } from "./booking.services";

const createBookingController = async (req: Request, res: Response) => {
  try {
    const user = req.user; // auth middleware থেকে
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

export const bookingsControllers = {
  createBooking: createBookingController,
  // getBookings,
  // getSingleBooking,
};
