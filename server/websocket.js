const { io } = require('./http.js');
const { listQuestions } = require('../services/questions.js');
const { updateStatusGame } = require('../services/games.js');

let sockets = new Array();
let matches = {};
let questions = listQuestions();

io.on('connection', socket => {
  sockets.push(socket.id);
  console.log(`New User connected. ID: ${socket.id}`);

  // Start Play
  socket.on('enterRoom', (data, cb) => {
    let clients = io.sockets.adapter.rooms.get(data.room);
    let numClients = clients ? clients.size : 0;

    if (numClients < 2) {
      socket.join(data.room);
      cb(socket.id);

      io.sockets.adapter.rooms.get(data.room);
      numClients = clients ? clients.size : 0;

      if (matches[data.room] != null) {
        matches[data.room].users[socket.id] = {
          name: data.user,
          rounds: [false, false, false, false, false]
        };
      } else {
        matches[data.room] = {
          users: {}
        };

        matches[data.room].users[socket.id] = {
          name: data.user,
          rounds: [false, false, false, false, false]
        };
      }
    }

    if (numClients == 2) {
      matches[data.room].rounds = new Array();
      matches[data.room].rounds.push(questions[matches[data.room].rounds.length]);
      matches[data.room].round = 0;
      matches[data.room].nextRound = false;

      let response = {};
      response.round = matches[data.room].rounds[matches[data.room].rounds.length-1];

      Object.keys(matches[data.room].users).forEach(user => {
        response[user] = matches[data.room].users[user].rounds.reduce(function (acc, value) {
          return acc + value ? 100 : 0;
        }, 0);
      });

      io.to(data.room).emit('startPlay', { response, users: matches[data.room].users });
    }
  });

  // Answer Question
  socket.on('answerQuestion', (data, cb) => {
    let question = matches[data.room].rounds[matches[data.room].round];
    let alternative = question.alternatives.find(alternative => alternative.id == data.questionId);
    let isCorrect = alternative != null ? alternative.correct : false;

    console.log(alternative);
    console.log(isCorrect);

    matches[data.room].users[data.socketId].rounds[matches[data.room].round] = isCorrect;

    cb({ correct: isCorrect });

    if (matches[data.room].nextRound) {
      if (matches[data.room].round < 4) {
        matches[data.room].round += 1;
        matches[data.room].rounds.push(questions[matches[data.room].round]);
  
        io.to(data.room).emit('nextQuestion', { round: questions[matches[data.room].round], users: matches[data.room].users });
      } else {
        updateStatusGame(data.room, 'finished');
        io.to(data.room).emit('finishGame', { users: matches[data.room].users });
      }
    }

    matches[data.room].nextRound = !matches[data.room].nextRound;
  });
});
