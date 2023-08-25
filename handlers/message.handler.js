export let messages = {
    // room: [{user: name1, message: message1},
    //        {user: name2, message: message2}]
}

export default function messageHandler(io, socket) {


    const updateMessagesList = (room) => {
            io.to(room).emit('messages_list:update', messages[room])
        }

    socket.on('message:add', ({name, room, message})=>{
            if (!messages[room]) { messages[room] = [] }
            messages[room].push({user: name, message: message})
            updateMessagesList(room)
        })

    socket.on('messages_list:get', ({name, room})=>{
        if (!messages[room]) {messages[room] = []}
        updateMessagesList(room)
    })

}

export function log_messages(room, name, message, io) {
    if (!messages[room]) { messages[room] = [] }
    messages[room].push({user: name, message: message})
    io.to(room).emit('messages_list:update', messages[room])
}