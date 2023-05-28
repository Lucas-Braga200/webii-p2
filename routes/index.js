const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index.hbs', { route: 'home' });
});

router.get('/list', (req, res, next) => {
  res.render('list.hbs', { route: 'list' });
});

router.get('/quiz/:id', (req, res, next) => {
  res.render('quiz.hbs', { route: 'quiz' });
});

router.get('/play', (req, res, next) => {
  res.render('play.hbs', { route: 'play' });
});

module.exports = router;
