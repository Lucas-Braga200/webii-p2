const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

let games = [];

// Format
// {
//   id: '---',
//   playerOne: '---',
//   playerTwo: '---',
//   status: '---',
//   startedAt: '---',
// }

const createGame = (playerOne, playerTwo) => {
  let game = {
    id: uuidv4(),
    playerOne: playerOne,
    playerTwo: playerTwo,
    status: 'waiting',
    startedAt: moment().format(),
  };

  games.push(game);

  return game;
};

const updateGame = (id, playerOne, playerTwo, status) => {
  let gameIndex = games.findIndex(game => game.id == id);

  games[gameIndex].playerOne = playerOne;
  games[gameIndex].playerTwo = playerTwo;
  games[gameIndex].status = status;
};

const updateStatusGame = (id, status) => {
  let gameIndex = games.findIndex(game => game.id == id);

  games[gameIndex].status = status;
};

const getGame = (id) => {
  return games.find(game => game.id == id);
};

const listGames = () => {
  return games;
};

module.exports = { createGame, updateGame, getGame, listGames, updateStatusGame };
