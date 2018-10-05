/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Socket server main.
 */

const cors = require('cors');
const express = require('express');
const colors = require('colors');
const wildcard = require('socketio-wildcard');
const env = require('./.env');

console.log(env);

const port = process.env.PORT || '5000';
var app = express();
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
const server = app.listen(port);
server.on('error', (error) => {
    console.log((`♂ Mars Server: There was an error starting the app. Search for error code: ${error.code}.`));
});
server.on('listening', () => {
    console.log((`♂ Mars Server: Socket listening on port ${port}`).green.bold);
    init();
});
const io = require('socket.io').listen(server);

function init() {
    io.use(wildcard());
    io.on('connection', function(socket) {
        console.log((`♂ Mars Server: An user connected.`).green);
        socket.on('*', (event) => {
            let name = event.data ? event.data[0] : "";
            let data = event.data ? (event.data[1] || {}) : {};
            let room = data.room;
            delete data.room;
            return room ? socket.to(room).emit(name, data) : socket.broadcast.emit(name, data);
        });
        socket.on('join', function(room) {
            socket.join(room);
        });
        socket.on('leave', function(room) {
            socket.leave(room);
        });
    });
}