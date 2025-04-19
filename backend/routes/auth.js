const express = require("express");
const router = express.Router();
const User = require("../models/User");

//DENEME GET
router.get("/register", async (req, res) => {
  res.send("Auth Register");
});

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
    const newUser = await new User({ username, email, password });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

module.exports = router;
