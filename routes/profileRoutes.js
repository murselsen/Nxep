const express = require("express");
const router = express.Router();

// Controller
const profileController = require("../controllers/profileController");

router.get("/", profileController.loadProfiles);

module.exports = router;
