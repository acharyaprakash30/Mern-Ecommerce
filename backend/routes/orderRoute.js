const express = require("express");
const orderController = require('../controllers/orderController');
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router = express.Router();    
router.get('/order/me',isAuthenticatedUser,orderController.myOrders)
router.post('/order/new',isAuthenticatedUser,orderController.newOrder)
router.get('/order/:id',isAuthenticatedUser,orderController.getSingleOrder)
router.get('/admin/orders',isAuthenticatedUser,authorizeRoles("admin"),orderController.getAllOrders)
router.put('/admin/orders/:id',isAuthenticatedUser,authorizeRoles("admin"),orderController.updateOrder)
router.delete('/order',isAuthenticatedUser,authorizeRoles("admin"),orderController.deleteOrder)

module.exports = router;