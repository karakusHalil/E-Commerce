const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Tüm kullanıcıları getir getAll()
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

//Id'ye göre kullanıcı getir

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı Bulunamadı !" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});


//Kullanıcı Güncelleme

router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateInfo = req.body;

    //Kullanıcı bulunmazsa hata döndürme
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı Bulunamadı !" });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateInfo, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

// Kullanıcı Silme İşlemi

router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı !" });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

module.exports = router;
