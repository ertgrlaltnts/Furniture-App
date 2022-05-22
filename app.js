const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
var session = require('express-session');
const MongoStore = require('connect-mongo');
const pageRouter = require("./routers/pageRouter");
const furnitureRouter = require("./routers/furnitureRouter");
const categoryRouter = require("./routers/categoryRouter");
const authRouter = require("./routers/authRouter");

mongoose
  .connect("mongodb://localhost/furniture-db", { useNewUrlParser: true })
  .then(() => {
    console.log("Db'ye bağlanıldı");
  });

//Template engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/furniture-db' })
}));


//Global Variables
global.UserIN = null;


//Routers
app.use('*' , (req, res, next)=>{
  userIN = req.session.userID;
  next();
})
app.use("/", pageRouter);
app.use("/furnitures", furnitureRouter);
app.use("/categories", categoryRouter);
app.use("/users", authRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portu ile başlatıldı.`);
});
