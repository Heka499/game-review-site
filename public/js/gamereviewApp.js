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

const socket = io();

$('#chatForm').submit(() => {
    socket.emit('message');
    $('#chat-input').val('');
    return false;
});
socket.on('message', (message) => {
    displayMessage(message.content);
});

let displayMessage = (message) => {
    $('#chat').prepend($('<li>').html(message));
};