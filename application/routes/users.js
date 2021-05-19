var express = require('express');
var router = express.Router();
var db = require('../config/database');
const UserModel = require('../models/Users')
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var bcrypt = require('bcrypt');
const UserError = require('../helpers/error/UserError');
const { check, validationResult } = require('express-validator');
const { usernameExists } = require('../models/Users');

router.post('/register', [

  check('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage(" Username must be at least 3 alphanumeric characters"),

  check('email')
    .trim()
    .isEmail()
    .withMessage("invalid email address"),

  check('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage(" Password must be 8 characters long")
    .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[(/*-+!@#$^&*)])/g)
    .withMessage(" Password must contain at least 1 upper case letter and 1 number and 1 of the following special characters ( / * - + ! @ # $ ^ & * )."),

  check("cpassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords must be identical.");
    }
    return true;
  }),
], (req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    errors.array().forEach(error => {
      req.flash('error', error.msg)
    })
    return res.redirect('/register');
  }

  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  UserModel.usernameExists(username)
    .then((usernameExists) => {
      if (usernameExists) {
        throw new UserError(
          "Regstration Failed: Username already Exists",
          "/register",
          200
        );
      } else {
        return UserModel.emailExists(email);
      }
    })
    .then((emailDoesExist) => {
      if (emailDoesExist) {
        throw new UserError(
          "Regstration Failed: Email already Exists",
          "/register",
          200
        );
      } else {
        return UserModel.create(username, password, email);
      }
    })
    .then((createdUserId) => {
      if (createdUserId < 0) {
        throw new UserError(
          "Server Error: user could not be created",
          "/register",
          500
        );
      } else {
        successPrint("User.js --> User was created")
        req.flash('success', 'User account has been made!')
        res.redirect("/login")
      }
    })
    .catch((err) => {
      errorPrint("user could not be made", err);
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage())
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
      } else {
        next(err);
      }
    });
});

router.post('/login', [

  check('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage(" Invalid Username!"),

  check('password')
    .trim()
    // .isLength({ min: 8 })
    .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[(/*-+!@#$^&*)])/g)
    .withMessage(" Invalid password!"),

], (req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    errors.array().forEach(error => {
      req.flash('error', error.msg)
    })
    return res.redirect('/login');
  }

  let username = req.body.username;
  let password = req.body.password;

  UserModel.authenticate(username, password)
    .then((loggedUserId) => {
      if (loggedUserId > 0) {
        successPrint(`User ${username} is logged in`);
        req.session.username = username;
        req.session.userId = loggedUserId;
        res.locals.logged = true;
        req.flash('success', 'User have succesfully logged in!')
        res.redirect('/');
      } else {
        throw new UserError(
          "invalid username and/or password!",
          "/login",
          200
        );
      }
    })
    .catch((err) => {
      errorPrint("user login failed", err);
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage())
        res.status(err.getStatus());
        res.redirect("/login");
      } else {
        next(err);
      }
    })
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      errorPrint('session could not be destroyed');
      next(err);
    } else {
      successPrint('Session was destroyed');
      res.clearCookie('csid')
      res.json({ status: "OK", message: "user is logged out" })
    }
  })
})

module.exports = router;


