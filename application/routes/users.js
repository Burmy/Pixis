var express = require('express');
var router = express.Router();
var db = require('../config/database');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var bcrypt = require('bcrypt');
const UserError = require('../helpers/error/UserError');
const { check, validationResult } = require('express-validator');

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

  console.log(req.body);
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  db.execute("SELECT * FROM users WHERE username=?", [username])
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return db.execute("SELECT * FROM users WHERE email=?", [email]);
      } else {
        throw new UserError(
          "Regstration Failed: Username already Exists",
          "/register",
          200
        );
      }
    })
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return bcrypt.hash(password, 15);
      } else {
        throw new UserError(
          "Regstration Failed: Email already Exists",
          "/register",
          200
        )
      }
    })
    .then((hashedPassword) => {

      let baseSQL = 'INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now());'
      return db.execute(baseSQL, [username, email, hashedPassword])

    })
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        successPrint("User.js --> User was created")
        req.flash('success', 'User account has been made!')
        res.redirect("/login")
      } else {
        throw new UserError(
          "Server Error: user could not be created",
          "/register",
          500
        );
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
    .isLength({ min: 8 })
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

  let baseSQL = "SELECT id, username, password FROM users WHERE username=?;";
  let userID;
  db.execute(baseSQL, [username])
    .then(([results, fields]) => {
      if (results && results.length == 1) {
        let hashedPassword = results[0].password;
        userID = results[0].id;
        return bcrypt.compare(password, hashedPassword)
      } else {
        throw new UserError(
          "Invalid username and/or password!",
          "/login",
          200
        );
      }
    })
    .then((passwordsMatched) => {
      if (passwordsMatched) {
        successPrint(`User ${username} is logged in`);
        req.session.username = username;
        req.session.userID = userID;
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


