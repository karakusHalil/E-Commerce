const express = require("express");
const Category = require("../models/Category");
const router = express.Router();

//Tüm kategorileri getir GetAll()
router.get("/", async (req, res) => {
  res.send("Category List");
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
