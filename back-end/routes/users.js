const express = require('express');
const router = express.Router();
const db = require ('../db/queries')

/* GET users listing. */
router.post('/new', db.registerUser);

module.exports = router;
