const router = require('express').Router();
const { Task } = require('../models');
const { withAuth, withAdmin} = require('../utils/withAuth');

router.get('/about-us', (req, res) => {res.render('about-us', req)});
router.get('/dot-services', (req, res) => { res.render('dot-services', req)});
router.get('/prorgram-management', (req, res) => {res.render('program-management', req)});
router.get('/schedule', withAuth, (req, res) => { res.render('appointments', req) });
router.get('/dashboard', withAuth, (req, res) => { res.render('dashboard', req) });
router.get('/admin', withAdmin, (req, res) => { res.render('admin', req) });
router.get('/login', (req, res) => { res.render('login', req) });
router.get('/', (req, res) => { res.render('homepage2', req) });

module.exports = router;