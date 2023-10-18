const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const url1 = process.env.DB_URL;
// mongoose.connect(uri);
mongoose.connect(url1, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
// const connection = mongoose.createConnection(uri);     
connection.on('open', () => { 
    console.log("MongoDB connected with blacksparrow yoyo");
}).on('error', (error) => {
    console.log("MongoDB connection error: " + error);
});

module.exports = connection;

