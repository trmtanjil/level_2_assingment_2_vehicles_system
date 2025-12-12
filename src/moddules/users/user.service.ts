import bcrypt from "bcryptjs"
import { pool } from "../../config/db";

const creatUser = async(payload:Record<string,unknown>)=>{
    const {name, role, email,password,phone}= payload;
    console.log(payload.user_id)
    const hashPass = await bcrypt.hash(password as string,10)

  const result = await pool.query(
      `INSERT INTO users(name, role, email, password, phone) 
       VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [name, role, email, hashPass, phone]
    );
    return result
}


const getUser=async()=>{
   const result= await pool.query(`SELECT * FROM users `)
   return result
}
const getSingleUser=async( id:string)=>{
   const result= await pool.query(`SELECT * FROM users WHERE id = $1`,[id])
   return result;
}

const updateUser=async(name:string, email:string,id:string)=>{
   const result= await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,[name, email,id])
   return result
}

const userDelet=async(id:string)=>{
  const result= await pool.query(`DELETE FROM users WHERE id = $1`,[id])
  return result
}
export const userServices={
    creatUser,
  getUser,
  getSingleUser,
  updateUser,
  userDelet

}