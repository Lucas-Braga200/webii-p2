const playerSelect = $('.quiz_player_select');
const playModal = new bootstrap.Modal(document.getElementById('playModal'));

let position;
let disabled = false;

$(playerSelect).click(function(e) {
  if (disabled) {
    return;
  }

  const element = $(this);
  position = $(element).data('player');

  playModal.show();
});

$('#quiz_modal_start').click(function() {
  disabled = true;

  let name = $('#playerName').val();
  $(`.quiz_player_select[data-player=${position}] .card-player`).addClass('selected');
  $(`.quiz_player_select[data-player!=${position}] .card-player`).addClass('disabled');
  $(`.quiz_player_select[data-player=${position}] .player-label`).text(name);

  $('#quiz_room_loading').removeClass('d-none');
  $('#select-label').addClass('d-none');

  let body = {
    name,
  };

  if (position == 'one') {
    body.one = true;
    body.two = false;
  } else if (position == 'two') {
    body.two = true;
    body.one = false;
  }

  fetch('/api/play', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }).finally(() => {
    playModal.hide();
  });
});
