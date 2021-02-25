const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/products/:productId', shopController.getProduct);

router.get('/movies', shopController.getMovies);

router.get('/web-series', shopController.getWebSeries);

router.get('/tv-serials', shopController.getTvSerials);

router.post('/review/:movieId', shopController.postReview);

router.get('/movie/:movieId',shopController.getMovie);

router.get('/', shopController.getProducts);


module.exports = router;
