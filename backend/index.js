const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;

// for testing requests and view response in json
app.use(express.json());
app.use(cors());
// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/note", require("./routes/note"));

// Listening to port
app.listen(port, () => {
  console.log(`eNotes listening at port:${port}`);
});
