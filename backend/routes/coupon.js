const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");

//Coupon oluşturma

router.post("/", async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

module.exports = router;
