
const {MongoClient} = require("mongodb")

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
   
};


const getProducts = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect()
        const db = client.db('E-commerceProject');
        const result = await db.collection("items").find().toArray();
        response.status(200).json({ status: 200, data: result });
    }catch(error){
        response.status(404).json({ status: 404, data: "Not Found" });
    }finally{
        client.close()
    }
}
const getProductsByPage = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        const pageNumber = request.params.pageNumber;
        const docsToSkip = (pageNumber) * 25;
        
        await client.connect()
        const db = client.db('E-commerceProject');
        const result = await db.collection("items").find().limit(25).skip(docsToSkip).toArray();
        const count = await  db.collection("items").countDocuments();
        response.status(200).json({ status: 200, data: result , count: count});
    }catch(error){
        response.status(404).json({ status: 404, data: "Not Found" });
    }finally{
        client.close()
    }
}

const getCompanies = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect()
        const db = await client.db('E-commerceProject');
        const result = await db.collection("companies").find().toArray();
        response.status(200).json({ status: 200, data: result });
    }catch(error){
        response.status(404).json({ status: 404, data: "Not Found" });
    }finally{
        client.close()
    }
}

const getProductsByBrand = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        const companyId = Number(request.params.companyId);
        await client.connect()
        const db = client.db('E-commerceProject');
        const result = await db.collection("items").find({"companyId":companyId}).toArray();
        
        response.status(200).json({ status: 200, data: result, count: result.length});
    }catch(error){
        response.status(404).json({ status: 404, data: "Not Found" });
    }finally{
        client.close()
    }
}

module.exports ={getProducts,getCompanies,getProductsByBrand,getProductsByPage}