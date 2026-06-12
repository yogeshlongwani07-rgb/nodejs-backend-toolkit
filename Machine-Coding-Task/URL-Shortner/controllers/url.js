const { v4: uuidv4 } = require("uuid");
const URL = require("../models/Schema");

async function handleGetShortUrl(req, res) {
  const body = req.body;
  const shortId = uuidv4();
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visithistory: [],
  });
  return res.json({ id: shortId });
}

async function counterForVisitedUrl(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.find({ shortId });
  const count = result[0].visithistory.length;
  res.send(`Visited ${count}`);
}

module.exports = { handleGetShortUrl, counterForVisitedUrl };
