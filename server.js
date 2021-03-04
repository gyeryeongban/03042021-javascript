const io = require('socket.io')(3000)

const user = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        user[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    // console.log('new User')
    // socket.emit('chat-message', 'Hello!')
    socket.on('send-chat-message', message => {
        // console.log(message)
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id]})
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', user[socket.id])
        delete user[socket.id] = name
    })
})