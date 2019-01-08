const Room = require('colyseus').Room;

const TURN_TIMEOUT = 10

module.exports = class TicTacToe extends Room {
    onInit () {}
    onJoin (client) {}
    onMessage (client, data) {}
    onLeave (client) {}
}

