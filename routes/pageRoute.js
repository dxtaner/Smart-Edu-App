const express = require("express");
const pageController = require("../controllers/pageController");

const router = express.Router();

router.route("/").get(pageController.getİndexPage);
router.route("/about").get(pageController.getAboutPage);

module.exports = router;