const mongoose = require('mongoose');
const config = require('../config');

const connectDB = async () => {
  try {
    const con = await mongoose.connect(config.mongodb.mongURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    console.log('MongoDB is not connected');
  }
};

module.exports = connectDB;
