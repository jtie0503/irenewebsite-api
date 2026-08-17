import { ObjectId, Db } from "mongodb";
import { TOrder, modelOrder } from "./order.model";
import { paginate } from "../../utils/paginate.uti";


let db:Db
export function setDb(database:Db){
    db = database;
}

export function useOrderRepository(){

    const collection = db.collection('orders')

    async function add(value:TOrder) {

        try {
            value = modelOrder(value)
            const items = await collection.insertOne(value)
            return items.insertedId
        } catch (error:any) {
           throw new  Error('Failed to Add Order:'+ error.message);
        }
    }

    async function getAll(
        search = "",
        email = "",
        page = 0,
        limit =10

    ) {
        page = page > 0? page -1:0;
        const query :Record<string,any> = {}

        if (email) {
            query.email = email;
        }
        if(search)query.$text = { $search:search}
        try {
            const items = await collection.find(query)
            .skip(page*limit)
            .limit(limit)
            .toArray()
            const length = await collection.countDocuments(query)
            return paginate (items, page, limit ,length)
        } catch (error:any) {
            throw new  Error('Failed to GET Order:'+ error.message);
        }
        
    }

    async function getById(id:string) {
        try {
            new ObjectId(id)
        } catch (error:any) {
            throw new  Error('Invalid ID Format');
        }

        try {
           const items = await collection.findOne({_id: new ObjectId(id)})
           if (!items) {
                throw new Error("Order not found")
            }
           return items
        } catch (error:any) {
             throw new  Error('Failed to Get Order by ID:'+ error.message);
        }
    }

    async function updateById(id:string, value:Partial<TOrder>) {
        try {
            new ObjectId(id)
        } catch (error:any) {
            throw new  Error('Invalid ID Format');
        }

        try {
            value.updatedAt = new Date()
            const items = await collection.updateOne(
                {_id: new ObjectId(id)},
                {$set:value}
            );
            if (items.matchedCount === 0) {
                throw new Error("Order not found")
            }
            return items.modifiedCount
        } catch (error:any) {
            throw new  Error('Failed to Update Order:'+ error.message);
        }
    }

     async function deleteById(id:string){
        try {
            new ObjectId(id)
        } catch (error:any) {
            throw new  Error('Invalid ID Format');
        }
        try {
            const items = await collection.deleteOne({_id:new ObjectId(id)})
            if (items.deletedCount === 0) {
            throw new Error("Order not found");
            }

            return "Successfully Deleted";  
        } catch (error:any) {
             throw new  Error('Failed to Delete Order:'+ error.message);
        }
    }

    return {
        add,
        getAll,
        getById,
        updateById,
        deleteById
    }

}
