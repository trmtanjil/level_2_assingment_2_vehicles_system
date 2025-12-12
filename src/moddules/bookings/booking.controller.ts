import { Request, Response } from "express";
import { bookingsServices } from "./booking.services";
 


// Create Booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const user = req.body.user; // middleware থেকে user object (JWT)
    const payload = { ...req.body, customer_id: user.id };
    const result = await bookingsServices.createBooking(payload);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get Bookings
export const getBookings = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const bookings = await bookingsServices.getBookings(user);

    res.status(200).json({ success: true, data: bookings });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Single Booking
export const getSingleBooking = async (req: Request, res: Response) => {
  try {
    const booking = await bookingsServices.getSingleBooking(req.params.id!);

    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    res.status(200).json({ success: true, data: booking });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Booking Status
export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body; // cancelled / returned
    const booking = await bookingsServices.updateBookingStatus(req.params.id as string, status);

    res.status(200).json({ success: true, data: booking });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

 
 export const bookingsControllers={
    createBooking,
    getBookings,
    getSingleBooking,
 }