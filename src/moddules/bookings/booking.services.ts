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

export const bookingsServices = {
  createBooking,
  // getBookings,
  // getSingleBooking,
  // updateBookingStatus,
  // deleteBookings,
};