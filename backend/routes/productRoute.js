const express = require("express");
const productController = require('../controllers/productController');
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");


const router = express.Router();    

router.post('/admin/products/new',isAuthenticatedUser,authorizeRoles("admin"),productController.createProducts)
router.post('/products/review',isAuthenticatedUser,productController.createProductReview)
router.get('/products', productController.getAllProducts)
router.put('/admin/products/:id',isAuthenticatedUser,authorizeRoles("admin"),productController.updateProduct)
router.delete('/admin/products/:id',isAuthenticatedUser,authorizeRoles("admin"),productController.deleteProduct)
router.get('/products/:id',productController.getProductDetails)
router.get('/reviews',productController.getProductReviews)
router.delete('/products/reviews',isAuthenticatedUser,productController.deleteReview)

module.exports = router;