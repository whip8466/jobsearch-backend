const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
require('./app/config/database');
const API_V1 = require("./app/routes/v1.routes");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  return res.json({ message: "Welcome to blog application." });
});

app.use('/api', API_V1);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`environment: ${process.env.APP_ENV}`);
console.log(`Server is running on port ${PORT}.`);
});
