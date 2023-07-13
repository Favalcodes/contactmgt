const express = require('express')
const { registerUser, loginUser, userProfile, updateProfile } = require('../controllers/userController')
const validateToken = require('../middleware/validateToken')

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', validateToken, userProfile)
router.put('/update', validateToken, updateProfile)

module.exports = router