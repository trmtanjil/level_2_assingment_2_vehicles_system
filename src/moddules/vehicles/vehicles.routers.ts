import express  from "express"
import { vehiclesControllers } from "./vehicles.controller"
 


const router =express.Router()

//vihicles crud
router.post('/',vehiclesControllers.creatvehicles)


export const vehiclesRouter = router