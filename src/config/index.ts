import dotenv from "dotenv"
import path from "path"


dotenv.config({path: path.join(process.cwd(), ".env")})


const config = {
    connection_str:process.env.COCCECTION_STR,
    port:process.env.port,
    jwtSecret:process.env.JWT_SECRET
}
export default config;