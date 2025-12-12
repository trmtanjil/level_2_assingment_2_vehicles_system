import express  from "express"
import { vehiclesControllers } from "./vehicles.controller"
 


const router =express.Router()

//vihicles crud
router.post('/',vehiclesControllers.creatvehicles)
router.get('/',vehiclesControllers.getVehicles)
router.get('/:id',vehiclesControllers.singleVehicles)
router.put('/:id',vehiclesControllers.updateVehicles)
router.delete('/:id',vehiclesControllers.deletvahicles)



export const vehiclesRouter = router