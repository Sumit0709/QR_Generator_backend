const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const createQRRoutes = require('./route/createQR');

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("qr_img"));

// MY Routes
app.use("/base_url",createQRRoutes);

const port = 8000;
app.listen(port, () => {
    console.log("Server is running on port " + port);
})