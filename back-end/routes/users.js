const express = require('express');
const router = express.Router();
const db = require('../db/queries')
const { loginRequired } = require('../auth/helpers');

router.post('/register', db.registerUser);
router.post('/login', db.loginUser);
router.get('/logout', loginRequired, db.logoutUser);

module.exports = router;
