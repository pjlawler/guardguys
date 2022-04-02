const router = require('express').Router();

const apiRoutes = require('./api');
const adminRoutes = require('./admin-routes');

router.use('/api', apiRoutes);
router.use('/admin', adminRoutes)

router.use((req, res) => {
  res.status(469).end();
});

module.exports = router;