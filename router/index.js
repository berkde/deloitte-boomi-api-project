const express = require('express');
const router = express.Router();
const { sendOrderRequests } = require('../controller/indexV4');

router.post('/', sendOrderRequests);

module.exports = router;