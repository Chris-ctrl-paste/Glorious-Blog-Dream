const express = require('express');
const { signup, signin, signout, forgotPassword, resetPassword, socialLogin } = require('../controllers/auth');


const { userSignupValidator, userSigninValidator, passwordResetValidator } = require('../validator');
const { userById } = require('../controllers/user');

const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/signin', userSigninValidator, signin);
router.get('/signout', signout);


router.put('/forgot-password', forgotPassword);
router.put('/reset-password',  resetPassword);


router.post('/social-login', socialLogin);

//Any route run with userid will be executed first
router.param('userId', userById);

module.exports = router;
