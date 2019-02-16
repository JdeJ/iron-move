const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/poke', (req, res, next) => {
  const url = 'https://pokeapi.co/api/v2/pokemon/';

  axios.get(url)
    .then(({ data }) => {
      console.log(data);
      res.status(200);
      res.json(data);
    })
    .catch((error) => {
      res.status(500);
      res.json({
        error,
      });
    });
});

router.get('/moves', (req, res, next) => {
  // hacer conexion a BD
  res.json({
    data: {},
  });
});

router.post('/moves', (req, res, next) => {
  const { name, from, to } = req.body;
  res.json({
    name,
    from,
    to,
  });
});

router.put('/moves/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, from, to } = req.body;
  res.json({
    name,
    from,
    to,
    id,
  });
});

module.exports = router;
