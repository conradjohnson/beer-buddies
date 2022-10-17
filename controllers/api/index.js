const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const beerRoutes = require('./beerRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/beer', beerRoutes);

module.exports = router;