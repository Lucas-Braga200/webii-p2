moment.locale('pt');

const playModal = new bootstrap.Modal(document.getElementById('playModal'));

let idSelected = null;

function createListItem(item) {
  let status = {
    'waiting': 'Esperando',
    'started': 'Iniciado',
    'finished': 'Concluído',
  };

  let columnAction = '';

  if (item.status == 'waiting') {
    columnAction = `
      <div class="col d-flex justify-content-end align-items-center">
        <button type="submit" class="btn btn-primary play_buttons" data-room="${item.id}">
          Jogar
        </button>
      </div>
    `;
  }

  return `
    <div class="row mb-2">
      <div class="col">
        <div class="w-100">
          <div class="game-list">
            <div class="row gx-0 game-item">
              <div class="col d-flex justify-content-center align-items-center">
                <div class="game-names w-100">
                  <span class="name">
                    ${item.playerOne != null ? item.playerOne : 'Vazio'}
                  </span>
                  <span class="versus">VS</span>
                  <span class="name">
                    ${item.playerTwo != null ? item.playerTwo : 'Vazio'}
                  </span>
                </div>
              </div>
              <div class="col d-flex justify-content-center align-items-center">
                <div class="game-started w-100">
                  ${moment(item.startedAt).format('LLL')}
                </div>
              </div>
              <div class="col d-flex justify-content-center align-items-center">
                <div class="game-status w-100">
                  <div class="status-badge">
                    ${status[item.status]}
                  </div>
                </div>
              </div>
              ${columnAction}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

fetch('/api/play').then(games => games.json()).then(games => {
  if (games.length == 0) {
    $('#quiz_list').html(`
      <div class="row mb-2">
        <div class="col">
          <div class="w-100">
            <div class="game-list">
              <div class="row gx-0 game-item">
                <div class="col d-flex justify-content-center align-items-center">
                  Nenhuma partida foi iniciada ainda.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  } else {
    let itens = games.map(game => createListItem(game)).join('');
    $('#quiz_list').html(itens);
  }
}).finally(() => {
  $('#quiz_modal_start').click(function() {
    let name = $('#playerName').val();
    util.post('/quiz', {name, id: idSelected});
    playModal.hide();
  });

  $('.play_buttons').click(function() {
    idSelected = $(this).data('room');
    playModal.show();
  });
});
