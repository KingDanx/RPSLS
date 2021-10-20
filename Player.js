"use strict";

class Player{
    constructor(name){
        this.name = name;
        this.choice = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
        this.points = 0;
        this.gesture;
    }

    getPlayerChoice(){
    }
}

module.exports = {
    Player: Player
}