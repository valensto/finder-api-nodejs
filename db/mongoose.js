const mongoose = require("mongoose");

const url = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@localhost:27017/${process.env.MONGODB_DATABASE}?authSource=admin`;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
