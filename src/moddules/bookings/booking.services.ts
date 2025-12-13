import { pool } from "../../config/db";

// Create Booking
export const createBooking = async (payload: Record<string, any>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  // 1️⃣ Validate vehicle availability
  const vehicle = await pool.query(
    `SELECT * FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );

  if (!vehicle.rows[0]) throw new Error("Vehicle not found");
  if (vehicle.rows[0].availability_status === "booked")
    throw new Error("Vehicle not available");

  // 2️⃣ Validate date
  if (new Date(rent_end_date) <= new Date(rent_start_date))
    throw new Error("rent_end_date must be after rent_start_date");

  // 3️⃣ Calculate total price
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  const total_price = days * parseFloat(vehicle.rows[0].daily_rent_price);

  // 4️⃣ Insert booking
  const booking = await pool.query(
    `
    INSERT INTO bookings
      (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
    VALUES ($1,$2,$3,$4,$5,'active')
    RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  // 5️⃣ Update vehicle status
  await pool.query(
    `UPDATE vehicles SET availability_status='booked', updated_at=NOW() WHERE id=$1`,
    [vehicle_id]
  );

  return booking.rows[0];
};

// Get All Bookings (Admin or Customer)
export const getBookings = async (user: any) => {
  if (user.role === "admin") {
    const result = await pool.query(`SELECT * FROM bookings`);
    return result.rows;
  } else {
    const result = await pool.query(
      `SELECT * FROM bookings WHERE customer_id=$1`,
      [user.id]
    );
    return result.rows;
  }
};

// Get Single Booking
export const getSingleBooking = async (id: string) => {
  const result = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [id]);
  return result.rows[0];
};

// Update Booking Status (Cancel / Return)
export const updateBookingStatus = async (
  bookingId: string,
  status: "cancelled" | "returned"
) => {
  const booking = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [
    bookingId,
  ]);

  if (!booking.rows[0]) throw new Error("Booking not found");

  // If cancelling, must be before start date
  if (status === "cancelled" && new Date() >= new Date(booking.rows[0].rent_start_date)) {
    throw new Error("Cannot cancel booking after start date");
  }

  // Update booking status
  const updatedBooking = await pool.query(
    `UPDATE bookings SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *`,
    [status, bookingId]
  );

  // If cancelled or returned → update vehicle availability
  await pool.query(
    `UPDATE vehicles SET availability_status='available', updated_at=NOW() WHERE id=$1`,
    [booking.rows[0].vehicle_id]
  );

  return updatedBooking.rows[0];
};
 

export const bookingsServices={
  createBooking,
  getBookings,
  getSingleBooking,
  updateBookingStatus,
//   deletebookings,

}
 