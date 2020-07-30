const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { User } = require("./models/user");
const config = require("./config/key");
/*
mongoose
  .connect(
    "mongodb+srv://mern:mern@mern.nkor2.mongodb.net/react-blog?retryWrites=true&w=majority",
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log("MongoDb Database Connected"))
  .catch((err) => console.error(err));
*/
  mongoose
  .connect(config.mongoURI,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => console.log("MongoDb Database Connected"))
  .catch((err) => console.error(err));


// use: middleware
// urlencoded for avoiding deprecated warning
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// routing
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userData) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World  shrestha");
});

app.listen(5000);
