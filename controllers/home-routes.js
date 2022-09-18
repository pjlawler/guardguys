const router = require('express').Router();
const { Task } = require('../models');
const { withAuth, withAdmin} = require('../utils/withAuth');
const { moreInfo } = require('../utils/helpers');


router.get('/background_checks', (req, res)=> {res.render('more-info-background_checks', req)});
router.get('/faqs', (req, res)=> {res.render('faqs', req)});
router.get('/contact_us', (req, res)=> {res.render('contact_us', req)});
router.get('/dna_testing', (req, res)=> {res.render('more-info-dna_testing', req)});
router.get('/employer_solutions', (req, res)=> {res.render('more-info-employer_solutions', req)});
router.get('/other_services', (req, res)=> {res.render('more-info-other_services', req)});
router.get('/drug_alcohol_testing', (req, res)=> {res.render('more-info-drug_alcohol', req)});
router.get('/dot_programs', (req, res)=> {res.render('more-info-dot_programs', req)});
router.get('/about-us', (req, res) => {res.render('about-us', req)});
router.get('/dot-services', (req, res) => { res.render('dot-services', req)});
router.get('/program-management', (req, res) => {res.render('program-management', req)});
router.get('/schedule', withAuth, (req, res) => { res.render('appointments', req) });
router.get('/dashboard', withAuth, (req, res) => { res.render('dashboard', req) });
router.get('/admin', withAdmin, (req, res) => { res.render('admin', req) });
router.get('/login', (req, res) => { res.render('login', req) });
router.get('/', (req, res) => { res.render('homepage2', req) });


module.exports = router;