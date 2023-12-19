

const { MongoClient } = require("mongodb");
const items = require('./data/items.json');
const companies = require('./data/companies.json');
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);

const batchImport = async() => {
    try {
        await client.connect();
        const db = client.db('E-commerceProject');
        const resultCompanies = await db.collection("companies").insertMany(companies);
        const resultItems = await db.collection("items").insertMany(items)
        console.log(resultCompanies)
        console.log(resultItems)
    } catch (error) {
        console.log(error)
    } finally {
        client.close();
    }
};

// batchImport();