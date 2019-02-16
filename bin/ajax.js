const axios = require('axios');

const url = 'https://pokeapi.co/api/v2/pokemon/';
const url2 = 'http://localhost:3000/api/moves/asdfghjk';
axios.post(url2, {
  name: 'Fred',
  from: 'Flintstone',
  to: 'to',
})
  .then(({ data }) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
