import express from 'express';
import { createServer } from 'http';
const app = express();
import { Server } from "socket.io";

import cors from 'cors';

import route from './route.js';
import onConnection from './onConnection.js';

app.use(cors({origin: "*"}))
app.use(route)

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
});

io.on('connection', (socket)=>{
   onConnection(io, socket)
})

server.listen(5000, () => {
    console.log('🚀 Server started on port 5000')
})