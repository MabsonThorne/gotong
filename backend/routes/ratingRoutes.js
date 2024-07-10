const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.post('/ratings', ratingController.addRating);
router.get('/ratings/:productId', ratingController.getRatingsByProduct);

module.exports = router;
