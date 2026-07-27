const express = require("express");
const router = express.Router();

const { analyzeProfile } = require("../Controllers/analyzeController");
const authMiddleware = require("../middleware/authmiddleware");

router.post("/", authMiddleware, analyzeProfile);

module.exports = router;