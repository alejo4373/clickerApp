const express = require('express');
const router = express.Router();
const db = require('../db/queries')
const { loginRequired } = require('../auth/helpers');
console.log(db)
console.log(loginRequired)
router.post('/new', db.registerUser);
router.post('/login', db.registerUser);
router.get('/logout', loginRequired, db.logoutUser);

module.exports = router;
