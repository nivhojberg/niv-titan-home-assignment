require('./models/db');

const express = require('express');
const app = express();

const photosRoute = require('./routes/photos');
const ordersRoute = require('./routes/orders');

app.use('/photos', photosRoute);
app.use('/orders', ordersRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
