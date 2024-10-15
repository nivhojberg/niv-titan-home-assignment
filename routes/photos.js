const { getPhotos } = require('../controllers/photos');
const express = require('express');
const router = express.Router();

router.get('/', getPhotos);

module.exports = router;
