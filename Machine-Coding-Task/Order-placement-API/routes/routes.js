const express = require("express");
const router = express.Router();
const createProduct = require("../controllers/createproduct");

router.post("/", createProduct);

module.exports = router;
