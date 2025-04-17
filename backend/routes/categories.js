const express = require("express");
const Category = require("../models/Category");
const router = express.Router();

//Tüm kategorileri getir GetAll()
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

//ID bilgisine göre kategori getir

router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    try {
      const category = await Category.findById(categoryId);
      res.status(200).json(category);
    } catch (error) {
      res.status(404).json({ error: "Kategori bulunamadı !" });
    }
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

//Yeni Kategori Ekleme

router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;
    const newCategory = new Category({ name, img });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

module.exports = router;
