import express  from "express"
import { vehiclesControllers } from "./vehicles.controller"
import auth from "../../midleware/auth"
 


const router =express.Router()

//vihicles crud
router.post('/' ,auth("admin"), vehiclesControllers.creatvehicles)
router.get('/',vehiclesControllers.getVehicles)
router.get('/:id',vehiclesControllers.singleVehicles)
router.put('/:id', auth('admin'), vehiclesControllers.updateVehicles)
router.delete('/:id',auth('admin'), vehiclesControllers.deletvahicles)



export const vehiclesRouter = router