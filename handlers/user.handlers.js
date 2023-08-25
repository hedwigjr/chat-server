let roomsList = {
  // 'room' : [user1, user2]
}
let users = {
  // 'user' : [room1, room2]
}

import { log_messages } from "./message.handler.js"

export default function userHandlers(io, socket) {

    const updateUserList = (room) => {
        io.to(room).emit('user_list:update', roomsList[room])
      }

    socket.on('user:add', ({name, room})=>{
        if (!roomsList[room]) { roomsList[room] = []}
        if(!roomsList[room].includes(name)) {
          roomsList[room].push(name)
          if (users[name] == undefined) {users[name] = [room]}  else {
            if (users[name].includes(room)) return
            users[name].push(room)
          }
          log_messages(room, 'Admin', `${name} has joined` , io)
        }
        updateUserList(room)
    })

    socket.on('user:disconnect', ({name, room})=>{
        if (!roomsList[room]) return
        log_messages(room, 'Admin', `${name} has leaved` , io)
        roomsList[room] = roomsList[room].filter((word) => word != name)
        updateUserList(room)
    })
}