const express = require("express");
const router = express.Router();
const furnitureController = require("../controllers/furnitureController");
const roleMiddleware = require('../middlewares/roleMiddleware');

router.route("/").post(roleMiddleware(['dealer' , 'admin']) , furnitureController.createFurniture);
router.route("/:slug").get(furnitureController.getFurniture);
router.route("/favourite").post(furnitureController.addFavourite);
router.route("/remove").post(furnitureController.removeFavourite);

module.exports = router;
