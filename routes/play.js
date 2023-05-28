const express = require('express');

const router = express.Router();

const { createGame, listGames } = require('../services/games');

router.post('/api/play', async (req, res) => {
  const { one, two, name } = req.body;

  if (one == null && two == null) {
    return res.status(400).json({
      'error': 'Pelo uma das posições deve ser selecionada.',
    });
  }

  if (name == null || name == '') {
    return res.status(400).json({
      'error': 'Insira um nome válido.',
    });
  }

  let game;

  if (one != null) {
    game = createGame(name, null);
  } else if (two != null) {
    game = createGame(null, name);
  }

  return res.json(game);
});

router.get('/api/play', (req, res) => {
  return res.json(listGames());
});

module.exports = router;
