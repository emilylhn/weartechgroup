const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const getProductsByNameAndId = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const searchTerm = req.params.query.toLowerCase(); 
    await client.connect();
    const db = client.db("E-commerceProject");

    const products = await db.collection("items").find({ name: { $regex: searchTerm, $options: 'i' } }).toArray();

    if (products.length === 0) {
      res.status(404).json({ status: 404, message: "No products found for the given search term" });
    } else {
      const productNamesAndIds = products.map(({ _id, name }) => ({ id: _id, name }));
      res.status(200).json({ status: 200, data: productNamesAndIds });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  } finally {
    client.close();
  }
};

module.exports = { getProductsByNameAndId } ;
