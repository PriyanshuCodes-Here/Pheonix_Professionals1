const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

/* 🔥 ABSOLUTE PATH TO services.json */
const SERVICES_JSON_PATH = path.join(
  __dirname,
  "../../client/src/data/services.json"
);

/* 🔒 SAVE SERVICES JSON */
router.post("/services", (req, res) => {
  try {
    const { services } = req.body;

    if (!Array.isArray(services)) {
      return res.status(400).json({ error: "Invalid services data" });
    }

    fs.writeFileSync(
      SERVICES_JSON_PATH,
      JSON.stringify({ services }, null, 2),
      "utf-8"
    );

    res.json({ success: true });
  } catch (err) {
    console.error("JSON SAVE ERROR:", err);
    res.status(500).json({ error: "Failed to save services.json" });
  }
});

module.exports = router;
