var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/register', function (req, res, next) {
  res.render('register');
});

router.get('/imagepost', function (req, res, next) {
  res.render('imagepost');
});

router.get('/postimage', function (req, res, next) {
  res.render('postimage');
});


module.exports = router;
