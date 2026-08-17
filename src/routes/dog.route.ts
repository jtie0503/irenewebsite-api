import express from 'express'
import { useDogController } from '../resources/dog/dog.controller'

const router = express.Router()
const { add, getAll, getById, updateById, deleteById} = useDogController()

router.post("/", add);
router.get('/',getAll),
router.get('/:id',getById),
router.patch('/:id',updateById),
router.delete('/:id',deleteById)

export default router;  