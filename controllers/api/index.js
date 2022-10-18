const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
<<<<<<< HEAD
const beerRoutes = require('./beerRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/beer', beerRoutes);
=======
const beerlistRoutes = require('./beerlistRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/beerlist', beerlistRoutes);
>>>>>>> 8d5e5c35bed8a800d3768c4255d6a242c429d59c

module.exports = router;