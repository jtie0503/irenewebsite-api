import {MongoClient} from "mongodb"
import { PORT, MONGODB_URI, MONGO_DB } from './config'
import { setDb as setDogDb} from './resources/dog/dog.repository'
import { setDb as setOrderDb} from './resources/order/order.repository'

async function startServer() {
  try {
    //connect to MongoDB Atlas
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected to MongoDB Atlas!")

   // Get Database
    const db = client.db(MONGO_DB)
    setDogDb(db);
    setOrderDb(db);


    const app = require("./app").default;

    app.listen(PORT, () => {
      console.log(`Server running on http:localhost: ${PORT}`)
    })
 
   
  } catch (error) {
    console.error("Failed to connect MongoDb", error)
  }
}

startServer();