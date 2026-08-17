import Joi from 'joi'
import { ObjectId } from 'mongodb'

export type TOrder = {
    _id?: ObjectId

    dogId: ObjectId

    customerName: string
    email: string
    contactNumber: number

    deliveryMethod: "Pickup" | "Delivery"
    address?: string
    status:
        | "Pending Verification"
        | "Approved"
        | "Rejected"
        | "Reserved"
        | "Ready for Pickup"
        | "Out for Delivery"    
        | "Completed"

    createdAt: Date
    updatedAt: Date
}

export const schemaOrder = Joi.object({
    dogId: Joi.string().required(),
    customerName: Joi.string().required(),
    email:  Joi.string().email().required(),
    contactNumber: Joi.number().min(0).required(),
    deliveryMethod:Joi.string().valid("Pickup", "Delivery").required(),
    address:Joi.string().allow(""),
     status: Joi.string()
        .valid(
            "Pending Verification",
            "Approved",
            "Rejected",
            "Reserved",
            "Ready for Pickup",
            "Out for Delivery",
            "Completed"
        )
        .optional()
   
})

export const schemaUpdateOrder = Joi.object({
    dogId: Joi.string().optional(),
    customerName: Joi.string().optional(),
    email:  Joi.string().email().optional(),
    contactNumber: Joi.number().min(0).optional(),
    deliveryMethod:Joi.string().valid("Pickup", "Delivery").optional(),
    address:Joi.string().allow(""),
    status: Joi.string()
    .valid(
        "Pending Verification",
        "Approved",
        "Rejected",
        "Reserved",
        "Ready for Pickup",
        "Out for Delivery",
        "Completed"
    )
    .optional(),
})

export function modelOrder(value:TOrder):TOrder{
    return{
        ...value,
        status: value.status || "Pending Verification",
        createdAt: value.createdAt || new Date(),
        updatedAt: new Date()
    }
}