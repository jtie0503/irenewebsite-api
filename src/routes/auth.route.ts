import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } from "../config";

const router = Router()

router.post("/logIn", (req:Request , res:Response) => {
    const { email, password} = req.body

    if(email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD){
        res.status(401).json({message:"Invalid Email or Pasword"})
        return
    }
    const token = jwt.sign({email},JWT_SECRET,{
        expiresIn:"1d"
    });

    res.json({message:"Message Successfully", token})
})


router.delete("/logOut", (req:Request , res:Response) => {
    res.clearCookie("adminToken");
    res.json({message:"Log Out Successfully"})
})
export default router;