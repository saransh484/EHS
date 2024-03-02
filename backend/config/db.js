// const mongoose = require('mongoose');
// // const { MongoClient, ServerApiVersion } = require('mongodb');
// require("dotenv").config();
// const url1 = process.env.DB_URL;
// // mongoose.connect(uri);
// mongoose.connect(url1, { useNewUrlParser: true, useUnifiedTopology: true });
// const connection = mongoose.connection;
// // const connection = mongoose.createConnection(uri);     
// connection.on('open', () => {
//     console.log("MongoDB connected with blacksparrow yoyo");
// }).on('error', (error) => {
//     console.log("MongoDB connection error: " + error);
// });
// module.exports = connection;

const mongoose = require('mongoose');
require("dotenv").config();
// Retrieve MongoDB connection URL from environment variables
const uri = process.env.DB_URL;
// Connect to MongoDB using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
// Event listeners to check for successful connection or errors
connection.on('connected', () => {
    console.log('MongoDB connected with blacksparrow yoyo');
});
connection.on('error', (error) => {
    console.log('MongoDB connection error:', error);
});
module.exports = connection;
