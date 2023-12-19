const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };


  // handler that retrieves the item from the items collection based on its _id
  const getItem = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    
    try {
        const _id = Number(req.params.itemId)
        await client.connect();
        const db = client.db("E-commerceProject");
        const itemResult = await db.collection("items").findOne({"_id": _id});

    // if no item is found, return 404 item not found error
        if (itemResult === null) {
            res.status(404).json({status: 404, id: _id, message: "Item Not Found"})
    // else, return item 
        } else {
            res.status(200).json({status: 200, id: _id, data: itemResult});
        }

    } catch (error) {
        console.error(error); 
    }
    client.close();
  };


module.exports = getItem;