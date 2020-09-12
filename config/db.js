const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    conn = await mongoose.connect(process.env.MONGO_URI+`/${process.env.DBNAME}`, {
      useNewUrlParser : true ,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (e) {
    console.log(err);
  }
}

module.exports = connectDB;
