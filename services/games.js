const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

let games = [
  {
    id: '6e915dff-b4c8-480f-8238-96ab953d3945',
    playerOne: 'Teste',
    playerTwo: null,
    status: 'waiting',
    startedAt: '2023-05-28T00:34:55-04:00'
  }
];

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

  console.log(game);

  games.push(game);

  return game;
};

const updateGame = (id, playerOne, playerTwo, status) => {
  let gameIndex = games.findIndex(game => game.id == id);

  games[gameIndex].playerOne = playerOne;
  games[gameIndex].playerTwo = playerTwo;
  games[gameIndex].status = status;
};

const getGame = (id) => {
  return games.find(game => game.id == id);
};

const listGames = () => {
  return games;
};

module.exports = { createGame, updateGame, getGame, listGames };
