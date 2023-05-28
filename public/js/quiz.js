let interval;

let selectedAlternative;

function startStopwatch() {
  let minutes = 5;
  let seconds = 0;

  function updateStopwatch() {
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }

    let minutesFormatted = minutes.toString().padStart(2, '0');
    let secondsFormatted = seconds.toString().padStart(2, '0');

    $('#minutes').text(minutesFormatted);
    $('#seconds').text(secondsFormatted);

    if (minutes === 0 && seconds === 0) {
      clearInterval(interval);
      Swal.fire({
        title: 'Você perdeu pontos!',
        text: 'Infelizmente você não respondeu a tempo.',
        icon: 'error',
        confirmButtonText: 'Continuar'
      }).then(() => {
        socket.emit('answerQuestion', { room, questionId: null, socketId }, response => {  
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
        });
      });
    }
  }

  interval = setInterval(updateStopwatch, 1000);
}

function finishStopwatch () {
  clearInterval(interval);
}

$('.card-alternative').click(function() {
  selectedAlternative = $(this);

  $('.card-alternative').removeClass('selected');

  $(this).addClass('selected');
});
