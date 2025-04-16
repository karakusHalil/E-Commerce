const express = require("express");
const mongoose = require("mongoose");


const app = express();

app.get("/", (req, res) => {
  res.send("Server JS");
});

app.listen(5000, () => {
  console.log("Sunucu çalışıyor...");
});
