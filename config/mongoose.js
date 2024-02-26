const mongoose = require("mongoose");
const config = require('./config');

// connect with mongoose
const mongooseUrl = config.mongoose.url;

//database connection
mongoose.connect(config.mongoose.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


const database = mongoose.connection;

// If any error in mongoose
// database.on("error", console.error.bind(console, "Error Connecting to MongoDB"));

// // It operated one time IF mongoose database is connected.
// database.once('open', function(){
//     console.log("Database Connected :: MongoDB");
//     console.log("Click to go : http://localhost:3001/");
// })


module.exports = database;