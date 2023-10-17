const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://blacksparrow:MajorEhs@major.qvrnz3y.mongodb.net/?retryWrites=true&w=majority";
const url1 = "mongodb+srv://blacksparrow:MajorEhs@major.qvrnz3y.mongodb.net/major?retryWrites=true&w=majority"
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

