const express = require("express");
const router = express.Router();
const {
  handleGetShortUrl,
  counterForVisitedUrl,
} = require("../controllers/url");
const URL = require("../models/url");

router.post("/", handleGetShortUrl);
router.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visithistory: { timestamps: Date.now() } } },
  );
  res.redirect(entry.redirectUrl);
});

router.get("/count/:shortId", counterForVisitedUrl);

module.exports = router;
