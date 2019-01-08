const Room = require('colyseus').Room;

const TURN_TIMEOUT = 10;

module.exports = class PushButton extends Room {
    onInit () {
        this.setState({
            boxes: [],
            players: [],
            id: 0
        });
    }

    onJoin (client) {
        client.playerID = this.state[id];
        this.state[id]++;
    }

    onMessage (client, data) {

    }

    onLeave (client) {

    }
}

