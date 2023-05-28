let interval;

function startStopwatch() {
  let minutes = 0;
  let seconds = 3;

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
      });
    }
  }

  interval = setInterval(updateStopwatch, 1000);
}

startStopwatch();
