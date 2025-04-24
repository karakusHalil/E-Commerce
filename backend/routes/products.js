const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//Tüm ürünlerin getir getAll()
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

module.exports = router;
