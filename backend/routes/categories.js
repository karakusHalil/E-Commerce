const express = require("express");
const router = express.Router();


//Tüm kategorileri getir GetAll()
router.get("/",async (req,res) => {
    res.send("Category List");
})

module.exports = router;