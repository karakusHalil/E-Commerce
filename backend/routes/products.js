const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer"); // Dosya yükleme ayarı

//Deneme
// router.get("/", async (req,res) => {
//     res.send("Ürün Listesi");
// })

//Tüm ürünlerin getir getAll()
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

//Id bilgisine göre ürün getirme
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Ürün Bulunamadı !" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

// Yeni Ürün ekleme
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updateInfo = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Ürün Bulunamadı !" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateInfo,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

//Id ye göre ürün Silme işlemi
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Ürün Bulunamadı !" });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: "Sunucu Hatası !" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // uploads/img/products/ dizinine yükleme
    const productDir = path.join(__dirname, '../uploads/img/products/product1'); 
    cb(null, productDir); 
  },
  filename: (req, file, cb) => {
    // Benzersiz dosya adı oluşturma
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Multer upload ayarları
const upload = multer({ storage });

// Ürün resmini yükleme ve ürün verisini güncelleme
router.put('/:id/image', upload.array('image', 3), async (req, res) => {
  try {
    // Yüklenen dosyaların yolu
    const imagePaths = req.files.map(file => `/img/products/product1/${file.filename}`);

    // Ürün verisini güncelleme
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      { $set: { images: imagePaths } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }

    // Ürünle birlikte güncellenmiş resimleri döndür
    res.status(200).json(product);
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).send("Fotoğraf yüklenemedi");
  }
});

module.exports = router;
