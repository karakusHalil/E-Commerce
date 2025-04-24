const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//Deneme
// router.get("/", async (req,res) => {
//     res.send("Ürün Listesi");
// })

//Tüm ürünlerin getir getAll()
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

// Yeni Ürün ekleme
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası!" });
  }
});

module.exports = router;
