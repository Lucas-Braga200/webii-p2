let socket = io();

let respondEnabled = false;

let room = $('[data-room]').data('room');
let user = $('[data-user]').data('user');
let position = $('[data-position]').data('position');

let socketId;

socket.emit('enterRoom', { room, user }, id => {
  socketId = id;
});

socket.on('startPlay', data => {
  let response = data.response;

  $('#quiz_answer').html(response.round.question);
  $('#first_alternative').html(response.round.alternatives[0].text);
  $('#first_alternative').data('id', response.round.alternatives[0].id);

  $('#second_alternative').html(response.round.alternatives[1].text);
  $('#second_alternative').data('id', response.round.alternatives[1].id);

  $('#third_alternative').html(response.round.alternatives[2].text);
  $('#third_alternative').data('id', response.round.alternatives[2].id);
  
  $('#fourth_alternative').html(response.round.alternatives[3].text);
  $('#fourth_alternative').data('id', response.round.alternatives[3].id);

  $('.answer-spinner').addClass('d-none');

  $('#quiz_answer_button').removeAttr('disabled');

  respondEnabled = true;

  let users = data.users;

  $('#punctuation_container').html('');

  Object.keys(users).forEach(user => {
    addPunctuation(user, users[user].rounds.reduce(function (acc, value) {
      return acc + value ? 100 : 0;
    }, 0), users[user].name);
  });

  startStopwatch();
});

function addPunctuation(id, punctuation, name) {
  $('#punctuation_container').append(`
    <div class="punctuation" data-id="${id}">
      <div>
        <i class="fa-solid fa-user fa-fw"></i>
        ${name}
      </div>
      ${punctuation}
    </div>
  `);
}

function updatePunctuation(id, punctuation) {
  $(`[data-id="${id}"]`).text(punctuation);
}

$('#quiz_answer_button').click(() => {
  if (respondEnabled) {
    if (selectedAlternative != null) {
      socket.emit('answerQuestion', { room, questionId: $(selectedAlternative).data('id'), socketId }, response => {
        if (response.correct) {
          Swal.fire({
            title: 'Uau!',
            text: 'Você acertou',
            icon: 'success',
            confirmButtonText: 'Continuar'
          });
        } else {
          Swal.fire({
            title: 'Ops!',
            text: 'Você errou.',
            icon: 'error',
            confirmButtonText: 'Continuar'
          });
        }

        $('#quiz_answer').html(`
          <div class="w-100 d-flex justify-content-center answer-spinner">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        `);
        $('#first_alternative').html(`
          <div class="w-100 d-flex justify-content-center answer-spinner">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        `);

        $('#second_alternative').html(`
          <div class="w-100 d-flex justify-content-center answer-spinner">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        `);

        $('#third_alternative').html(`
          <div class="w-100 d-flex justify-content-center answer-spinner">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        `);

        $('#fourth_alternative').html(`
          <div class="w-100 d-flex justify-content-center answer-spinner">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        `);

        $('#quiz_answer_button').attr('disabled');

        finishStopwatch();
      });
    } else {
      Swal.fire({
        title: 'Ops!',
        text: 'Selecione uma alternativa para responder.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
});

socket.on('nextQuestion', response => {
  $('#quiz_answer').html(response.round.question);
  $('#first_alternative').html(response.round.alternatives[0].text);
  $('#first_alternative').data('id', response.round.alternatives[0].id);

  $('#second_alternative').html(response.round.alternatives[1].text);
  $('#second_alternative').data('id', response.round.alternatives[1].id);

  $('#third_alternative').html(response.round.alternatives[2].text);
  $('#third_alternative').data('id', response.round.alternatives[2].id);
  
  $('#fourth_alternative').html(response.round.alternatives[3].text);
  $('#fourth_alternative').data('id', response.round.alternatives[3].id);

  $('.answer-spinner').addClass('d-none');

  $('#quiz_answer_button').removeAttr('disabled');

  let users = response.users;

  $('#punctuation_container').html('');

  Object.keys(users).forEach(user => {
    addPunctuation(user, users[user].rounds.reduce(function (acc, value) {
      return acc + (value ? 100 : 0);
    }, 0), users[user].name);
  });

  startStopwatch();
});

socket.on('finishGame', response => {
  finishStopwatch();

  let users = response.users;

  let punctuations = Object.keys(users).map(user => {
    let punctuation = users[user].rounds.reduce(function (acc, value) {
      return acc + (value ? 100 : 0);
    }, 0);
    return punctuation;
  });

  let message = 'Houve um empate.';

  if (punctuations[0] > punctuations[1]) {
    message = `O jogador ${users[Object.keys(users)[0]].name} ganhou.`;
  } else if (punctuations[1] > punctuations[0]) {
    message = `O jogador ${users[Object.keys(users)[1]].name} ganhou.`;
  }

  Swal.fire({
    title: 'O Jogo acabou!',
    text: message,
    icon: 'info',
    confirmButtonText: 'Continuar'
  }).then(function() {
    window.location = "/";
  });
});
