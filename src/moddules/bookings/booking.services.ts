import { pool } from "../../config/db";

// Booking service
const createBooking = async (
  user: any,
  vehicleId: number,
  start: string,
  end: string
) => {
  // Vehicle check
  const vehicleRes = await pool.query(
    `SELECT * FROM vehicles WHERE id=$1`,
    [vehicleId]
  );

  if (vehicleRes.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleRes.rows[0];
console.log(vehicle)
  // Safety: status check
  if (!vehicle.availability_status) {
    throw new Error("Vehicle status undefined");
  }

  //  Date validation
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Invalid start or end date");
  }

  if (endDate <= startDate) {
    throw new Error("End date must be after start date");
  }

  //  Check overlapping bookings
  const overlapRes = await pool.query(
    `
    SELECT * FROM bookings
    WHERE vehicle_id=$1
      AND status='active'
      AND NOT ($2 > rent_end_date OR $3 < rent_start_date)
    `,
    [vehicleId, startDate.toISOString(), endDate.toISOString()]
  );

  if (overlapRes.rows.length > 0) {
    throw new Error("Vehicle not available for selected dates");
  }

  //  Calculate total price
  const days =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const totalPrice = days * vehicle.daily_rent_price;

  //  Insert booking
  const bookingRes = await pool.query(`INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)VALUES ($1,$2,$3,$4,$5,'active')RETURNING *`,[user.id, vehicleId, startDate.toISOString(), endDate.toISOString(), totalPrice]  );

  //  Update vehicle status to booked
  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicleId]
  );

  return bookingRes.rows[0];
};


const getBookings = async(user:any)=>{
  if(user.role==="admin"){
    //admin can see
    const res = await pool.query(`SELECT * FROM bookings ORDER BY rent_start_date DESC`);
    return res.rows
  }else{
    //customer can seee
    const res = await pool.query(`SELECT * FROM booking WHERE customer_id=$1 ORDER BY rent_start_date DESC`,[user.id]);
    return res.rows;
  };
   
}



const updateBookingStatus = async (user: any, bookingId: number, newStatus: string) => {
  //  Booking check
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId]);
  if (bookingRes.rows.length === 0) {
    throw new Error("Booking not found");
  }
  const booking = bookingRes.rows[0];

  //  Role-based rules
  const now = new Date();
  const rentStart = new Date(booking.rent_start_date);

  if (user.role === "customer") {
    // Customer can cancel before start date only
    if (booking.customer_id !== user.id) {
      throw new Error("You are not allowed to cancel this booking");
    }
    if (now >= rentStart) {
      throw new Error("Cannot cancel after rental start date");
    }
    if (newStatus !== "cancelled") {
      throw new Error("Customers can only cancel booking");
    }
  } else if (user.role === "admin") {
    // Admin can mark as returned
    if (newStatus !== "returned") {
      throw new Error("Admin can only mark booking as returned");
    }
  } else {
    throw new Error("Unauthorized");
  }

  //  Update booking status
  await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2`,
    [newStatus, bookingId]
  );

  //  Update vehicle availability if returned or cancelled
  if (newStatus === "returned" || newStatus === "cancelled") {
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );
  }

  return { ...booking, status: newStatus };
};



export const bookingsServices = {
  createBooking,
  getBookings,
   updateBookingStatus,

};