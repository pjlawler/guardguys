const router = require('express').Router();
const { Task } = require('../models');
const withAuth = require('../utils/withAuth');

router.get('/about-us', (req, res) => {res.render('about-us', req)});
router.get('/dot-services', (req, res) => { res.render('dot-services', req)});
router.get('/pricing', (req, res) => {res.render('pricing', req)});
router.get('/schedule', withAuth, (req, res) => { res.render('appointments', req) });
router.get('/dashboard', withAuth, (req, res) => { res.render('dashboard', req) });
router.get('/admin', withAuth, (req, res) => { res.render('admin', req) });
router.get('/login', (req, res) => { res.render('login', req) });
router.get('/', (req, res) => { res.render('homepage', req) });

module.exports = router;