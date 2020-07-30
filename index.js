const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://mern:mern@mern.nkor2.mongodb.net/react-blog?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDb Database Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(5000);
