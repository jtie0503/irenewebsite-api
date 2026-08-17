import { Router, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "../config";

const router = Router()
//config claudinary 
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

router.post("/", async(req:Request, res: Response) =>{
    try {
        const { file } = req.body;
        const result = await cloudinary.uploader.upload(file,{
            folder: "emmans-pet-shop",
            resource_type: "auto"
        })
        res.json({ url: result.secure_url})
    } catch (error) {
        res.status(500).json({message:"upload failed"})
    }
})
export default router;


