const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index.hbs');
});

router.get('/list', (req, res, next) => {
  res.render('list.hbs');
});

module.exports = router;
