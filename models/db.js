const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TitanHomeAssignment').then(() => {
    console.log("Connection succeded");
}).catch((err) => {
    console.log("Error in connection", err);
});

require('./photo.model.js');
require('./order.model.js');
