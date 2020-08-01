const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')

const port = 3000 || process.env.port;
const path = require('path');
const { format } = require('path');
const server = http.createServer(app);
const io = socketio(server);

const bot = 'Chatbot';

// Use static file
app.use(express.static(path.join(__dirname, "public")));

// On connection of a new client
io.on('connection', socket => {
    
    console.log('new connection established...');

    socket.on('username', (nameValue)=>{
        // Broadcast when a user joins the chat
        socket.broadcast.emit('message', formatMessage(bot, `${nameValue} has joined the chat`));
        
        // Message shown when a user disconnects the chat
        socket.on('disconnect', () => {
            io.emit('message', formatMessage(bot,`${nameValue} has left the chat`));
        }); 
        socket.on('input', inputMsgValue => {
            io.emit('message',formatMessage(nameValue,inputMsgValue));
        })
    });
    // Welcome current user
    socket.emit('message',formatMessage(bot, 'Welcome to chatcord'));
});



server.listen(port, () => {
    console.log(`Server listening on:http://localhost:${port}`)
});



