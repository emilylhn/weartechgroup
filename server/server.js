'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');
const {getProducts, getCompanies,getProductsByBrand,getProductsByPage} = require('./handlers/productPageHandler');
const {addToCart, getCart, deleteCartItem, clearCart} = require('./handlers/cartHandler')
const getItem  = require("./handlers/getItems")
const { getProductsByCategory } = require('./handlers/getProductsByCategory')
const { getProductsByNameAndId } = require('./handlers/getProductNameAndId')

express()

.use(morgan('tiny'))


.use(express.static('public'))
.use(express.json())
.get('/', (req, res) => {
    res
        .status(200)
        .json({ status: 200, message: "This is the homepage... it's empty :(" });
})
.get('/products/',getProducts)
.get('/products/page/:pageNumber',getProductsByPage)
.get('/products/companies/:companyId',getProductsByBrand)
.get('/companies',getCompanies)

.get('/cart',getCart)

// endpoint that retrieves the product information based on the item ID in the URL param
.get('/products/:itemId', getItem)

.get('/products/category/:category', getProductsByCategory)
.get('/products/search/:query', getProductsByNameAndId)

.post('/cart',addToCart)

.delete('/cart',deleteCartItem)

// endpoint that removes all the items from the cart once the purchase is completed
.delete('/confirmation', clearCart)

.get('*', (req, res) => {
    res
        .status(404)
        .json({
            status: 404,
            message: 'This is obviously not the page you are looking for.',
        });
})

.listen(8000, () => console.log(`Listening on port 8000`));