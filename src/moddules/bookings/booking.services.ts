import { pool } from "../../config/db";

const creatbookings = async (payload:Record<string,unknown>)=>{
     const {
       customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status
    } = payload;

    const result = await pool.query(`
      INSERT INTO bookings
    (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,[
        customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status
    ]);
    return result;
}

const getbookings = async()=>{
    const result= await pool.query(`SELECT * FROM bookings`);
    return result;

}

const singlebookings = async(id:string)=>{
    const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`,[id])
    return result;
}
const updatebookings = async(paylod:Record<string,unknown>)=>{
    const {vehicle_name,type,daily_rent_price ,availability_status,id  } = paylod;
    const result = await pool.query(`UPDATE vehicles SET  vehicle_name = $1,
        type = $2,  
        daily_rent_price = $3,
        availability_status = $4,
        updated_at = NOW()
        WHERE id=$5
      RETURNING *;`,[vehicle_name,type,daily_rent_price,  availability_status,  id ])
      return result;
}


// const deletebookings= async(id:string)=>{
//     const result = await pool.query(`DELETE FROM vehicles WHERE id=$1 `,[id])
//     return result
// }

export const bookingsServices={
  creatbookings,
  getbookings,
  singlebookings,
  updatebookings,
//   deletebookings,


}