const express = require("express");
const router = express.Router();

// Controller
const profileController = require("../controllers/profileController");

router.get("/local/", profileController.localLoadProfiles);
router.get("/local/:displayName", profileController.localGetProfile);
router.get(
  "/local/:displayName/save/:saveDisplayName",
  profileController.localGetProfileSaveItem
);
module.exports = router;
