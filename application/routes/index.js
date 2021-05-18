var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
const { getRecentPosts, getPostbyId, getCommentsByPostId } = require('../middleware/postmiddleware')
var db = require('../config/database');

/* GET home page. */
router.get('/', getRecentPosts, function (req, res, next) {
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

router.use('/postimage', isLoggedIn);
router.get('/postimage', function (req, res, next) {
  res.render('postimage', { title: "Post your Image" });
});

router.get('/post/:id(\\d+)', getPostbyId, getCommentsByPostId, (req, res, next) => {
  res.render('imagepost', { title: `Post ${req.params.id}` });
})


module.exports = router;
