const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { User } = require("./models/user");
const config = require("./config/key");

const { auth } = require("./middleware/auth");
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
  .connect(config.mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDb Database Connected"))
  .catch((err) => console.error(err));

// use: middleware
// urlencoded for avoiding deprecated warning
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//authentication with token in cookies
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});

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

//login
app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "wrong password" });
      } else {
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie("x_auth", user.token).status(200).json({
            loginSuccess: true,
          });
        });
      }
    });
  });
});

//logout
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World  shrestha");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
