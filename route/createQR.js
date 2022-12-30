const express = require("express");
const router = express.Router();
const {createQR, getQR} = require('../controller/createQR');

// router.get("/createqr/:errorCorrectionLevel/:drak/:light/:type/:margin/:width/:url",createQR, getQR);
router.post("/createqr/",createQR, getQR);

module.exports = router