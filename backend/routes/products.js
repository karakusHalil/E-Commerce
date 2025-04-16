const express = require("express");
const router = express.Router();


//Tüm ürünleri getir 
router.get("/", async (req,res) => {
    res.send("Products List");
});

module.exports = router;