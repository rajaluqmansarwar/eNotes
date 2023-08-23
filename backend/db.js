const mongoose = require("mongoose");
// const mongoURI = "mongodb://0.0.0.0:27017/eNotes";
const mongoURI =
  "mongodb+srv://luqmanrajput012:lZ6Qn33PceAJNEIw@cluster0.dr6pp7f.mongodb.net/eNotes?retryWrites=true&w=majority";

const connectToMongo = async () => {
  await mongoose.connect(mongoURI, () => {
    console.log("connected to mongo successfully");
  });
};

module.exports = connectToMongo;
