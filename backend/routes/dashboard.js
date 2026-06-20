const express = require("express");
const dashboardData = require("../data/dashboardData");

const router = express.Router();

// GET /api/dashboard -> toutes les données d'analyse du notebook
router.get("/dashboard", (req, res) => {
  res.json(dashboardData);
});

module.exports = router;
