const express = require('express');
const Move = require('../models/move');

const router = express.Router();

router.get('/new', (req, res, next) => {
  res.render('moves/new');
});

router.post('/', (req, res, next) => {
  const { name, origin, destination } = req.body;

  Move.create({
    name,
    origin,
    destination,
  })
    .then((createdObject) => {
      res.redirect('/moves');
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/', (req, res, next) => {
  Move.find()
    .then((moves) => {
      res.render('moves/list', { moves });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Move.findById(id)
    .then((move) => {
      res.render('moves/show', { move });
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/:id/update', (req, res, next) => {
  const { id } = req.params;
  Move.findById(id)
    .then((move) => {
      res.render('moves/update', { move });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, origin, destination } = req.body;
  Move.findByIdAndUpdate(id, { name, origin, destination })
    .then((move) => {
      res.redirect('/moves');
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Move.findByIdAndDelete(id)
    .then((move) => {
      res.redirect('/moves');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
