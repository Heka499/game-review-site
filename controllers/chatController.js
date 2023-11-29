const Message = require('../models/message');

module.exports = io => {
    io.on('connection', client => {
        console.log('new connection');

        Message.find({})
            .sort({ createdAt: -1 })
            .limit(10)
            .then(messages => {
                client.emit("load all messages", messages.reverse());
            })
            .catch(err => console.log(`ERROR: ${err}`));

        client.on('disconnect', () => {
            client.broadcast.emit('user disconnected');
            console.log('user disconnected');
        });

        client.on('message', (data) => {
            let messageAttributes = {
                content: data.content,
                username: data.username,
                user: data.userId
            },
            m = new Message(messageAttributes);
            m.save().then(() => {
                io.emit('message', messageAttributes);
            })
            .catch(err => console.log(`ERROR: ${err}`));
        });
    });
};