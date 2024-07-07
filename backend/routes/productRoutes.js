// 文件路径：/home/ubuntu/gotong/backend/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// 使用 multer 配置存储选项
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/products', auth, upload.single('image'), productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.get('/product_ids', productController.getProductIds);
router.get('/user_products/:id', productController.getUserProducts);
router.put('/products/:id', auth, upload.single('image'), productController.updateProduct);

module.exports = router;
