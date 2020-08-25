const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login-success', authController.getLogin);

router.get('/signup-success', authController.getSignup);

// router.get('/signup-failure', authController.getSignupFailure);

// router.get('/login-failure', authController.getLoginFailure);


router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);



module.exports = router;