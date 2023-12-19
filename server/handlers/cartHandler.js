
const {MongoClient} = require("mongodb")

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
};

const addToCart = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db('E-commerceProject');
        const result = await db.collection("cart").insertOne(request.body);
        response.status(201).json({ status: 201, data: request.body });
    } catch (err) {
        response.status(201).json({ status: 201, data: request.body });
    }finally{
        client.close();
    }
    
}

const getCart = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect()
        const db = client.db('E-commerceProject');
        const result = await db.collection("cart").find().toArray();
        response.status(200).json({ status: 200, data: result });
    }catch(error){
        response.status(404).json({ status: 404, data: "Not Found" });
    }finally{
        client.close()
    }
}

const deleteCartItem = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db('E-commerceProject');
        const result = await db.collection("cart").deleteOne(request.body);
        response.status(201).json({ status: 201, data: result.deletedCount });
    } catch (err) {
        response.status(201).json({ status: 201, data: request.body });
    }finally{
        client.close();
    }
}

// handler that clears the cart collection after the purchase is completed 
// Returns a 505 internal server error in the case of an error
const clearCart = async(request, response) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db('E-commerceProject');
        const result = await db.collection("cart").deleteMany({});
        response.status(201).json({ status: 201, data: result.deletedCount });
    } catch (error) {
        response.status(500).json({ status: 500, error: 'Internal Server Error' });
    } finally {
        client.close();
    }
}

module.exports = {addToCart,getCart,deleteCartItem, clearCart}