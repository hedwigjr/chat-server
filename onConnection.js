import messageHandler from './handlers/message.handler.js'
import userHandlers from './handlers/user.handlers.js'
// const { addUser } = require('./users');

export default function onConnection(io, socket) {

    socket.on('join', ({user, room})=>{
        socket.join(room)
      })


    userHandlers(io, socket)

    messageHandler(io, socket)

    io.on('disconnect', ()=>{
        console.log('disconnect')
    })
}
