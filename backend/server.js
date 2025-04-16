const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const PORT = 5000;
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb bağlantısı başarılı...");
  } catch (error) {
    throw new Error(error);
  }
};

app.get("/", (req, res) => {
  res.send("Server JS");
});

app.listen(PORT, () => {
  connect();
  console.log(`Sunucu ${PORT} port üzerinde çalışıyor...`);
});
