const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
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

//check etmek için
router.get("/check", async (req, res) => {
  try {
    const { email, username, userId } = req.query;

    const emailUser = await User.findOne({ email });
    if (emailUser && emailUser._id.toString() !== userId) {
      return res.status(400).json({ error: "Bu e-posta zaten kullanımda." });
    }

    const usernameUser = await User.findOne({ username });
    if (usernameUser && usernameUser._id.toString() !== userId) {
      return res
        .status(400)
        .json({ error: "Bu kullanıcı adı zaten kullanımda." });
    }

    res
      .status(200)
      .json({ message: "Kullanıcı adı ve e-posta kullanılabilir." });
  } catch (error) {
    res.status(500).json({ error: "Sunucu hatası !" });
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

//Yeni kullanıcı ekleme

router.post("/", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // Kullanıcı adı, e-posta ve şifre zorunlu alanlar
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Kullanıcı adı, e-posta ve şifre zorunludur." });
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Geçerli bir e-posta girin." });
    }

    // Email benzersiz mi?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Bu e-posta adresi zaten kullanımda." });
    }

    // Kullanıcı adı benzersiz mi?
    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser) {
      return res
        .status(400)
        .json({ error: "Bu kullanıcı adı başka bir kullanıcıya ait." });
    }

    // Şifre uzunluğu kontrolü
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Şifre en az 6 karakter olmalıdır." });
    }

    // Kullanıcı adı uzunluğu kontrolü
    if (username.length < 3 || username.length > 20) {
      return res
        .status(400)
        .json({ error: "Kullanıcı adı 3-20 karakter arasında olmalıdır." });
    }

    // Şifreyi hash'le
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      role,
    });

    // Yeni kullanıcıyı veritabanına kaydet
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Sunucu hatası !" });
  }
});

//Kullanıcı Güncelleme

router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateInfo = req.body;

    // Kullanıcıyı bul
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı!" });
    }

    // E-posta başka bir kullanıcıya ait mi?
    if (updateInfo.email) {
      const existingUser = await User.findOne({ email: updateInfo.email });

      // Aynı email başka bir kullanıcıya aitse (kendi değilse)
      if (existingUser && existingUser._id.toString() !== userId) {
        return res
          .status(400)
          .json({ error: "Bu e-posta adresi başka bir kullanıcıya ait." });
      }
    }

    // Kullanıcı adı başka bir kullanıcıya ait mi?
    if (updateInfo.username) {
      const existingUsernameUser = await User.findOne({
        username: updateInfo.username,
      });
      if (
        existingUsernameUser &&
        existingUsernameUser._id.toString() !== userId
      ) {
        return res
          .status(400)
          .json({ error: "Bu kullanıcı adı başka bir kullanıcıya ait." });
      }
    }

    // Şifre güncellenmişse ve boş değilse hashle
    if (updateInfo.password && updateInfo.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updateInfo.password = await bcrypt.hash(updateInfo.password, salt);
    }

    // Güncelle
    const updatedUser = await User.findByIdAndUpdate(userId, updateInfo, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası!" });
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
