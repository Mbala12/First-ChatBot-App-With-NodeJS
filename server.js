const { Socket } = require('dgram');
const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

const io = require('socket.io')(http)
io.on('connection', socket =>{
    console.log('Connected ready');

    socket.on('sendMessage', msg=>{
        socket.broadcast.emit('sendToAll', msg);
        //console.log(msg);
    })
})


/* app.get('/', (req, res)=>{
    res.send('Test connection');
}) */

const port = process.env.PORT || 5000
http.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})