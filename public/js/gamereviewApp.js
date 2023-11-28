$(document).ready(() => {
    $('#modal-button').click(() => {
        $('.modal-body').html('');
        $.get('games?format=json', (data) => {
            data.forEach((game) => {
                $('.modal-body').append(
                    `<div>
                        <span class="game-title">${game.title}</span>
                        <div class="game-publisher">${game.publisher}</div>
                    </div>`
                );
            });
        });
    });
});