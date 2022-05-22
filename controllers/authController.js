const User = require("../models/User.js");
const Category = require("../models/Category");
const Furniture = require("../models/Furniture");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const user = User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            req.session.userID = user._id;
            res.status(200).redirect("/");
          } else {
            res.status(400).redirect("/login");
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: fail,
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID }).populate(
      "favourites"
    );
    const categories = await Category.find();
    const furnitures = await Furniture.find({ creater: req.session.userID });
    res.status(200).render("dashboard", {
      page_name: "dashboard",
      categories,
      user,
      furnitures,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
