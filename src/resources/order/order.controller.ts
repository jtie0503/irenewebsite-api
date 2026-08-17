import { useOrderRepository } from "./order.repository";
import { schemaOrder, schemaUpdateOrder } from "./order.model";
import { Request, Response, NextFunction } from "express";

export  function useOrderController(){


    const {
       add: _add,
       getAll: _getAll,
       getById: _getById,
       updateById: _updateById,
       deleteById: _deleteById,
    } = useOrderRepository()

    async function add(req:Request, res:Response, next: NextFunction){
        const value = req.body;
        const { error} = schemaOrder.validate(value)
        if(error){
            next( new Error (error.details[0].message))
            return;
        }
        try {
            const items = await _add(value)
            res.json({message:items})
        } catch (error) {
             next(error)
        }

    }

    async function getAll(req:Request, res:Response, next: NextFunction){
        try {
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 10
            const search = req.query.search as string || ""
            const email = req.query.email as string || "";
           const items = await _getAll(search, email, page, limit)
            res.json(items)
        } catch (error) {
            next (error)
        }
    }

     async function getById(req:Request, res:Response, next: NextFunction){
        try {
            const id = req.params.id as string
            const items = await _getById(id)
            res.json(items)
        } catch (error) {
            next(error)
        }
     }
 
       async function updateById(req:Request, res:Response, next: NextFunction){
           
                const id = req.params.id as string
                const value = req.body
                const { error } = schemaUpdateOrder.validate(value);

                    if (error) {
                        next(new Error(error.details[0].message));
                        return;
                    }
             try {
                const items = await _updateById(id, value)
                res.json({message:items})
            } catch (error) {
                next(error)
            }
       }

       async function deleteById(req:Request, res:Response, next: NextFunction){
            try {
                const id = req.params.id as string
                const items = await _deleteById(id)
                res.json({message:items})
            } catch (error) {
                next(error)
            }
       }

       return{
        add,
        getAll,
        getById,
        updateById,
        deleteById
     }

}