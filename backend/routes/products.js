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

//Id bilgisine göre ürün getirme
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Ürün Bulunamadı !" });
    }
    res.status(200).json(product);
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
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

//Id bilgisine göre ürün getirme
router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updateInfo = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Ürün Bulunamadı !" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateInfo,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

module.exports = router;
