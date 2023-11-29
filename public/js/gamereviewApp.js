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

socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
});

socket.on("load all messages", (data) => {
    data.forEach(message => {
        displayMessage(message);
    });
});

socket.on('user disconnected', () => {
    displayMessage({
        username: 'System',
        content: 'User left the chat'
    });
});

$('#chatForm').submit(() => {
    let text = $('#chat-input').val(),
        username = $('#chat-user-name').val(),
        userId = $('#chat-user-id').val();
    socket.emit('message' , {
        content: text,
        username: username,
        userId: userId
    });
    $('#chat-input').val('');
    return false;
});
socket.on('message', (message) => {
    displayMessage(message);
    for (let i = 0; i < 2; i++) {
        $('.chat-icon').fadeOut(200).fadeIn(200);
    }
});

let displayMessage = (message) => {
    $('#chat').prepend(
        $('<li>').html(`
            <strong class='message ${getCurrentUserClass(message.user)}'>
                ${message.username}
            </strong>: ${message.content}`
        )
    );
};

let getCurrentUserClass = (id) => {
    let userId = $('#chat-user-id').val();
    return userId === id ? "current-user" : "";
};