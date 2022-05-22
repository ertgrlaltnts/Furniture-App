const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.route('/').post(categoryController.createCategory);
router.route('/').get(categoryController.getAllCategory);
router.route('/:slug').get(categoryController.getFurnituresWithCategory);


module.exports = router;