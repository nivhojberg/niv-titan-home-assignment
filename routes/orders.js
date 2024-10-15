const { createOrder, getOrdersByUser } = require('../controllers/orders');
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.post('/', jsonParser, createOrder);

router.get('/getByUser', getOrdersByUser);

module.exports = router;
