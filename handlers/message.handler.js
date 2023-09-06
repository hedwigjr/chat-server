export let messages = {
    // room: [{user: name1, message: message1},
    //        {user: name2, message: message2}]
}

export default function messageHandler(io, socket) {
    const addToMessages = (name, room, message) => {
        if (!messages[room]) {messages[room] = []}
        messages[room].push({user: name, message: message})
    }
    const sendMessagesToClient = (room) => {
        io.to(room).emit('messages:get', messages)
    }

    socket.on('messages:add', ({user, room, message})=>{
        addToMessages(user, room, message)
        sendMessagesToClient(room)
        })

    socket.on('messages:update', ()=>{
        socket.emit('messages:get', messages)
    })

}

export function log_messages( user, room, message, io) {
    if (!messages[room]) { messages[room] = [] }
    messages[room].push({user: user, message: message})
    io.to(room).emit('messages:get', messages)
}