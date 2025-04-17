const express = require("express");
const router = express.Router();

//Routes alıyoruz

const categoryRoute = require("./categories");
const productRoute = require("./products");

//Route yollarını tanımlıyoruz

router.use("/categories", categoryRoute);
router.use("/products", productRoute);

module.exports = router;
