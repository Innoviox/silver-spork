export default class Player {
    constructor() {

    }

    connect() {
        this.room = colyseus.join("pushbutton");
    }
}