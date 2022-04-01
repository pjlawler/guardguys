const router = require('express').Router();

const eventRoutes = require('./event-routes.js');
const userRoutes = require('./user-routes');

router.use('/events', eventRoutes);
router.use('/users', userRoutes);

module.exports = router;