const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//mongoose.connect("mongodb://localhost/budget", {
//mongoose.connect(process.env.MONGODB_URI, {
mongoose.connect("mongodb://heroku_w13h7pn3:d80qejqrgk315br0jdh7vnbohf@ds143588.mlab.com:43588/heroku_w13h7pn3", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});