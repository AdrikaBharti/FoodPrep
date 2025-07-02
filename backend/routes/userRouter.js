const express = require('express')
const userRouter = express.Router()
const {loginUser,registerUser} = require('../controllers/userController')

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

const { addToWishlist, removeFromWishlist, getWishlist } = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

userRouter.post('/wishlist/add', authMiddleware, addToWishlist);
userRouter.post('/wishlist/remove', authMiddleware, removeFromWishlist);
userRouter.get('/wishlist', authMiddleware, getWishlist);


module.exports = userRouter