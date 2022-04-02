const router = require('express').Router();

const { Task } = require('../models');

router.get("/", function(req, res) {
    res.redirect('/admin.html')
});

module.exports = router;