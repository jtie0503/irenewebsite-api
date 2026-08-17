import express from 'express'
import { useOrderController } from '../resources/order/order.controller'

const router = express.Router()
const { add, getAll, getById, updateById, deleteById} = useOrderController()

router.post('/',add),
router.get('/',getAll),
router.get('/:id',getById),
router.patch('/:id',updateById),
router.delete('/:id',deleteById)

export default router;  