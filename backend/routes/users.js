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

//Yeni kullanıcı ekleme

router.post("/", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = new User({ username, email, password, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Sunucu hatası !" });
  }
});

module.exports = router;
