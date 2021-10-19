"use strict";
const prompt = require("prompt-sync")();
const {AI} = require("./AI");
const {Human} = require("./Human");
const {Player} = require("./Player");

class Game{
    constructor(rounds, playerNumber){
        this.rounds = rounds;
        this.playerNumber = playerNumber;
    }

    main(){
       if(this.determinePlayers() === 1){
            let ai = new AI("Robot");
            console.log(`\n${ai.name} will be your undoing!`);
            this.aiRandomChoice(ai);
       }
    }

    determinePlayers(){
        let player1 = new Human("Player 1");
        player1.name = player1.setName();

        if(this.playerNumber > 1){
            let player2 = new Human("Player 2");
            player2.name = player2.setName();
            console.log(`\nWelcome ${player1.name} and ${player2.name}!`);
            return 2;
        }
        else{
            console.log(`\nWelcome ${player1.name}!`);
            return 1;
        }
    }

    getChoice(){
        switch (key) {
            case value:
                
                break;
        
            default:
                break;
        }
    }

    aiRandomChoice(object){
        console.log(object.choice[Math.round(Math.random() * 5)]);
        return object.choice[Math.round(Math.random() * 5)];
    }

}

module.exports = {
    Game: Game
}