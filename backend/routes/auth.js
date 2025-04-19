const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const User = require("../models/User");

//DENEME GET
router.get("/register", async (req, res) => {
  res.send("Auth Register");
});

//

//Kullanıcı kayıt (REGISTER)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ error: "Bu email adresi daha önce kullanılmıştır !" });
    }

    const hashPassword = await bycrypt.hash(password, 10);

    const newUser = await new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

//GİRİŞ İŞLEMİ (LOGIN)

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //kullanıcı kontrolü var mı yok mu
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Geçersiz Email Adresi !" });
    }
    //Password kontrolü doğru mu değil mi
    const isValidPassword = await bycrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Geçersiz Şifre !" });
    }
    res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

module.exports = router;
