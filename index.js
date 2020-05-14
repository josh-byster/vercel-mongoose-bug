const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Replace with a cluster with latency to see effect (ex. Atlas)
const DB_URI = "mongodb://localhost:27017/";

mongoose.connection.on("connecting", () => {
  // Fires in serverless
  console.log("Connecting event");
});
mongoose.connection.on("connected", () => {
  // Does not fire in serverless until an explicit DB query happens
  console.log("Connected event");
});
mongoose
  .connect(DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    // Does not fire with serverless until an explicit DB query happens
    console.log("Connected promise fired!");
  });

app.get("/", (req, res) => res.send("Hello World!"));

module.exports = app;
