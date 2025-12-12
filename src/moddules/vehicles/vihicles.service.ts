import { pool } from "../../config/db";

const creatVihicles = async (payload:Record<string,unknown>)=>{
     const {
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    } = payload;

    const result = await pool.query(`
      INSERT INTO vehicles 
      (vehicle_name, type, registration_number, daily_rent_price, availability_status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,[
      vehicle_name,type,registration_number,daily_rent_price,availability_status,
    ]);
    return result;
}

const getVehicles = async()=>{
    const result= await pool.query(`SELECT * FROM vehicles`);
    return result;

}

const singleVehicles = async(id:string)=>{
    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`,[id])
    return result;
}
const updateVehicles = async(paylod:Record<string,unknown>)=>{
    const {vehicle_name,type,registration_number,availability_status,updated_at,id} = paylod;
    const result = await pool.query(`UPDATE vehicles SET  vehicle_name = $1,
        type = $2,  
        daily_rent_price = $4,
        availability_status = $5,
        updated_at = NOW()
      RETURNING *;`,[vehicle_name,type,registration_number, availability_status,  updated_at, id])
      return result;
}


const deletvahicles= async(id:string)=>{
    const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`,[id])
    return result
}

export const vahiclesServices={
  creatVihicles,
  getVehicles,
  singleVehicles,
  updateVehicles,
  deletvahicles,


}