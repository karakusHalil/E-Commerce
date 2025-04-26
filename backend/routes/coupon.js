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

//Bütün couponları listeleme

router.get("/", async (req, res) => {
  try {
    const coupon = await Coupon.find();
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

//Id ye göre coupon getirme

router.get("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return res.status(404).json({ error: "Kupon Bulunamadı !" });
    }
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

//Id bilgisine göre coupon güncelleme

router.put("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const updateInfo = req.body;

    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return res.status(404).json({ error: "Kupon Bulunamadı !" });
    }
    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updateInfo, {
      new: true,
    });
    res.status(200).json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

//Id ye göre kupon silme

router.delete("/:couponId", async (req,res)=>{
    try {
        const couponId = req.params.couponId;
        const deletedCoupon = await Coupon.findByIdAndDelete(couponId);
        if(!deletedCoupon){
            return res.status(404).json({error:"Kupon Bulunamadı !"});
        }
        res.status(200).json(deletedCoupon);
    } catch (error) {
        res.status(500).json({error:"Sunucu Hatası !"})
    }
})

module.exports = router;
