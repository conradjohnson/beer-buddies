const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const beerlistRoutes = require('./beerlistRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/beerlist', beerlistRoutes);

module.exports = router;
