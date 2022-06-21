const express = require("express");
const userController = require("../controllers/userController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router = express.Router();    

router.post('/register',userController.registerUser)
router.post('/login',userController.loginUser)
router.get('/logout',userController.logOut)
router.get('/me',isAuthenticatedUser,userController.getUserDetails)
router.post('/forgot',userController.forgotPassword)
router.post('/reset/:token',userController.resetPassword)
router.post('/password/update',isAuthenticatedUser,userController.updatePassword)
router.post('/me/update',isAuthenticatedUser,userController.updateUserProfile)
router.get('/admin/user',isAuthenticatedUser,authorizeRoles("admin"),userController.getAllUsers)
router.get('/admin/user/single/:id',isAuthenticatedUser,authorizeRoles("admin"),userController.getSingleUser)
router.put('/admin/user/:id',isAuthenticatedUser,authorizeRoles("admin"),userController.updateUserRole)
router.delete('/admin/user/:id',isAuthenticatedUser,authorizeRoles("admin"),userController.deleteUser)

module.exports = router;
