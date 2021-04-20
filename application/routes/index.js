var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('main', { title: "Welcome to Pixis!" });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: "Welcome Back!" });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: "Join Us!" });
});

router.get('/imagepost', function (req, res, next) {
  res.render('imagepost', { title: "Your Post" });
});

router.get('/postimage', function (req, res, next) {
  res.render('postimage', { title: "Post your Image" });
});

router.get('/home', function (req, res, next) {
  res.render('home', { title: "See Whats Happening" });
});


module.exports = router;
