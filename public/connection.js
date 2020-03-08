// Dependencies
const mongoose = require('mongoose');

// Database variables
const dbName = 'budget';
const dbPort = '27017';
const userName = process.env.DBUSER;
const password = process.env.DBPASSWORD;  
//
// Connection string
const connectionString = `mongodb+srv://${userName}:${password}@pubgithub-aqd38.mongodb.net/${dbName}`

const mongoOptions = {
    useNewUrlParser: true,
    useFindAndModify: false
};

// Create database connection
mongoose.Promise = global.Promise;
mongoose.connect(connectionString, mongoOptions);

// Connection events
// When successfully connected
mongoose.connection.on('connected', () => {
    console.log('Mongoose: connected to database on ' + connectionString);
});

// On error
mongoose.connection.on('error', (err) => {
    console.log('Mongoose: Connection error: ' + err);
});

// When the database is disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose: Database disconnected.');
});

// If the Node process ends, close mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close( () => {
        console.log('Mongoose: The app has closed. Database connection has been disconnected.');
        process.exit(0);
    })
})

module.exports = { mongoose };
