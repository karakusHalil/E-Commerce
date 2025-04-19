const express = require("express");
const router = express.Router();

//Routes alıyoruz

const categoryRoute = require("./categories");
const productRoute = require("./products");
const userRoute = require("./users");

//Route yollarını tanımlıyoruz

router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/users", userRoute);

module.exports = router;
