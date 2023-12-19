const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const getProductsByCategory = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        const category = request.params.category; 

        await client.connect();
        const db = client.db('E-commerceProject');
        const result = await db.collection("items").find({ "category": category }).toArray();

        response.status(200).json({ status: 200, data: result });
    } catch (error) {
        response.status(404).json({ status: 404, data: "Not Found" });
    } finally {
        client.close();
    }
};

module.exports = { getProductsByCategory };
