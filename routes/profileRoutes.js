const express = require("express");
const router = express.Router();

// Controller
const profileController = require("../controllers/profileController");

router.get("/", async () => {
  await profileController.loadProfiles();
});

module.exports = router;
