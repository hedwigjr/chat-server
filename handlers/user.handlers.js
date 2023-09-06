let roomsList = {
  // 'room' : [user1, user2]
}
let usersList = {
  // 'user' : [room1, room2]
}

import { log_messages } from "./message.handler.js"

export default function userHandlers(io, socket) {
    const addToDb = (user, room) => {
      const addToRoomsList = (name, room) => {
        if (!roomsList[room]) roomsList[room] = []
        if(!roomsList[room].includes(name)) {
          roomsList[room].push(name)
          log_messages( 'Admin', room, `${name} has joined`, io)
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
      addToRoomsList(user, room)
      addToUsersList(user, room)
    }
    const deletFromDB = (user, room) => {
      const deleteFromRoomsList = (name, room) => {
        if (!roomsList[room]) return
        roomsList[room] = roomsList[room].filter((word) => word != name)
        log_messages('Admin', room, `${name} has leaved` , io)
      }
      const deleteFromUsersList = (name, room) => {
        if (!usersList[name]) return
        usersList[name] = usersList[name].filter((word) => word != room)
      }
      deleteFromRoomsList(user, room)
      deleteFromUsersList(user, room)
    }


    socket.on('users:add', ({user, room})=>{
        addToDb(user, room)
        io.to(room).emit('users:get', {usersList, roomsList})
    })

    socket.on('users:update', ()=>{
      socket.emit('users:get', {usersList, roomsList})
  })

    socket.on('users:disconnect', ({user, room})=>{
        deletFromDB(user, room)
        io.to(room).emit('users:get', {usersList, roomsList})
    })
}