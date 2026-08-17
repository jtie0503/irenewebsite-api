import Joi from "joi";
import { ObjectId } from "mongodb";

export type TDog = {
    _id?: ObjectId, 
    breed: string,
    price: number,
    age: string,
    gender: string,
    color: string,
    description: string,
     status: "Available" | "Reserved"| "Sold",
    photos: string[],
    video: string,
    vaccinated: string,
    deworm: string,
    location: string,
    createdAt: Date,
    updatedAt: Date
}

export const schemaDog = Joi.object({
   
    breed:Joi.string().required(),
    price:Joi.number().min(0).required(),
    age:Joi.string().required(),
    gender:Joi.string().required(),
    color: Joi.string().required(),
    description:Joi.string().required(),
    photos: Joi.array().items(Joi.string()).required(),
    video:Joi.string().required(),
    vaccinated:Joi.string().required(),
    deworm:Joi.string().required(),
    location:Joi.string().required(),
    status: Joi.string()
  .valid("Available", "Reserved", "Sold")
  .required(),

})

export const schemaUpdateDog = Joi.object({
    
    breed:Joi.string().optional(),
    price:Joi.number().min(0).optional(),
    age:Joi.string().optional(),
    gender:Joi.string().optional(),

    color: Joi.string().optional(),
    description:Joi.string().optional(),
    photos: Joi.array().items(Joi.string()).optional(),
    video:Joi.string().optional(),
    vaccinated:Joi.string().optional(),
    deworm:Joi.string().optional(),
    location:Joi.string().optional(),
    status: Joi.string()
  .valid("Available", "Reserved", "Sold")
  .optional(),
})

export function modelDog(value:TDog): TDog{
    return{
         ...value,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "Available"
    }
}