const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/login').get(pageController.getLoginPage);
router.route('/register').get(pageController.getRegisterPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(pageController.sendEmail);

module.exports = router;