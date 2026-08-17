import express from 'express'
import dogRoute from './dog.route'
import orderRoute from './order.route'
import uploadRoute from "./upload.route";
import authRoute from "./auth.route";


const router = express.Router()

router.use('/dog', dogRoute)
router.use('/order',orderRoute)
router.use("/upload", uploadRoute);
router.use("/auth", authRoute)


export default router