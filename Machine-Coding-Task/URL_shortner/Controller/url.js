const express = require("express");
const router = express.Router();
const URL = require("../Model/Schema");
const { v4: uuidv4 } = require("uuid");

async function savingRoutes(req, res) {
  const body = req.body;
  const shortId = uuidv4();

  const result = await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
  });
  res.status(201).json({ message: "Done" });
}

async function showRoutes(req, res) {
  const { shortId } = req.params;
  const result = await URL.findOne({ shortId });
  res.status(200).json({ message: "OK", url: result.redirectUrl });
}

router.post("/", savingRoutes);

router.get("/:shortId", showRoutes);

module.exports = router;
