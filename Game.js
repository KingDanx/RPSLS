"use strict";
const prompt = require("prompt-sync")();
const {Human} = require("./Human");
const {Player} = require("./Player");

class Game{
    constructor(rounds, playerNumber){
        this.rounds = rounds;
        this.playerNumber = playerNumber;
    }

    main(){
       
    }

    determinePlayers(){
        let player1 = new Human("Player 1");
        player1.name = player1.setName();

        if(this.playerNumber > 1){
            let player2 = new Human("Player 2");
            player2.name = player2.setName();
            console.log(`Welcome ${player1.name} and ${player2.name}!`);
            return 2;
        }
        else{
            console.log(`Welcome ${player1.name}!`);
            return 1;
        }
    }

    getChoice(){
        
    }

    aiRandomChoice(){
        Math.random().round() * 5;
    }

}

module.exports = {
    Game: Game
}