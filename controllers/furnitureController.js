const Furniture = require("../models/Furniture");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.create(req.body);
    res.status(201).redirect("categories");
  } catch (error) {
    res.status(400).json({
      status: "error",
      error,
    });
  }
};

exports.getFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.findOne({ slug: req.params.slug });
    const user = await User.findOne({ _id: req.session.userID });
    res.status(200).render("furniture", {
      page_name: "furnitures",
      furniture,
      user,
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      error,
    });
  }
};

exports.addFavourite = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID });
    await user.favourites.push(req.body.furniture_id);
    user.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.removeFavourite = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.session.userID });
    await user.favourites.pull({ _id: req.body.furniture_id });
    user.save();
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
