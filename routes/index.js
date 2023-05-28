const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index.hbs', { route: 'index' });
});

router.get('/list', (req, res, next) => {
  res.render('list.hbs', { route: 'list' });
});

router.get('/quiz', (req, res, next) => {
  res.render('quiz.hbs', { route: 'quiz' });
});

module.exports = router;
