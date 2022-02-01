const { index, insertProduct} = require('../controllers/ProductController')
const express = require('express');
const router = express.Router();

router.get('/', index)

router.post('/insert/', insertProduct)

module.exports = router;