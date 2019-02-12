/* eslint-disable no-else-return */
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const middlewares = require('../middlewares');

const saltRounds = 10;

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/signup', middlewares.anonRoute ,(req, res, next) => {
  res.render('auth/signup', { errorMessage: undefined });
});

router.post('/signup', middlewares.anonRoute, (req, res, next) => {
  const { username, password } = req.body;

  if (username === '' || password === '') {
    return res.render('auth/signup', { errorMessage: 'no empty fields' });
  }
  User.findOne({ username })
    .then((user) => {
      if (user) {
        res.render('auth/signup', { errorMessage: 'user already exists' });
      } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        User.create({ username, password: hashedPassword })
          .then(() => {
            res.redirect('/moves');
          }).catch((error) => {
            next(error);
          });
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/login', middlewares.anonRoute, (req, res, next) => {
  res.render('auth/login', { errorMessage: undefined });
});

router.post('/login', middlewares.anonRoute, (req, res, next) => {
  const { username, password } = req.body;
  if (username === '' || password === '') {
    return res.render('auth/login', { errorMessage: 'no empty fields' });
  } else {
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          return res.render('auth/login', { errorMessage: 'el usuario no existe' });
        } else if (bcrypt.compareSync(password, user.password)) {
          req.session.currentUser = user;
          res.redirect('/moves');
        } else {
          return res.render('auth/login', { errorMessage: 'username or password incorrect' });
        }
      })
      .catch((error) => {
        next(error);
      });
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});


module.exports = router;
