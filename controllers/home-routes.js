const router = require('express').Router();
const { Task } = require('../models');


router.get('/login', (req, res) => {
    res.render('login', req);
});
router.get('/admin', (req, res) => {
    res.render('admin');
});

router.get('/', (req, res) => {
    if(req.session.loggedIn) {
        res.render('homepage', req);    
    }
    else {
        res.render('login');
    }
    
});

module.exports = router;