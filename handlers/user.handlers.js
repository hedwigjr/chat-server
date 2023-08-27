let roomsList = {
  // 'room' : [user1, user2]
}
let usersList = {
  // 'user' : [room1, room2]
}

import { log_messages } from "./message.handler.js"

export default function userHandlers(io, socket) {
    const addToRoomsList = (name, room) => {
      if (!roomsList[room]) roomsList[room] = []
      if(!roomsList[room].includes(name)) {
        roomsList[room].push(name)
        log_messages(room, 'Admin', `${name} has joined`, io)
      }
    }
    const addToUsersList = (name, room) => {
        if (usersList[name] == undefined) {
          usersList[name] = [room]}
        else {
           if (usersList[name].includes(room)) return
           usersList[name].push(room)
        }
    }
    const deleteFromRoomsList = (name, room) => {
      if (!roomsList[room]) return
      roomsList[room] = roomsList[room].filter((word) => word != name)
      log_messages(room, 'Admin', `${name} has leaved` , io)
    }
    const deleteFromUsersList = (name, room) => {
      if (!usersList[name]) return
      usersList[name] = usersList[name].filter((word) => word != room)
      console.log(usersList)
    }

    const updateUserList = (room) => {
        io.to(room).emit('user_list:update', roomsList[room])
      }



    socket.on('user:add', ({name, room})=>{
        addToRoomsList(name, room)
        addToUsersList(name, room)
        updateUserList(room)
        socket.emit('user_room_list:update', usersList)
    })





    socket.on('user:disconnect', ({name, room})=>{
        deleteFromRoomsList(name, room)
        deleteFromUsersList(name, room)
        updateUserList(room)
    })
}