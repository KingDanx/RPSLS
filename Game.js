"use strict";
const prompt = require("prompt-sync")();
const {AI} = require("./AI");
const {Human} = require("./Human");
const {Player} = require("./Player");

class Game{
    constructor(rounds, playerNumber){
        this.rounds = rounds;
        this.playerNumber = playerNumber;
        this.player1 = new Human("Player 1");
        this.player2 = new Human("Player 2");
        this.ai = new AI("Robot");
    }

    main(){
       if(this.determinePlayers() === 1){
            this.gameMechanics(this.player1, this.player1.getPlayerChoice(), this.ai, this.aiRandomChoice(ai));
       }
       else{
           this.gameMechanics(this.player1, this.player1.getPlayerChoice(), this.player2, this.player2.getPlayerChoice());
       }
    }

    determinePlayers(){
        this.player1.name = this.player1.setName();

        if(this.playerNumber > 1){
            this.player2.name = this.player2.setName();
            console.log(`\nWelcome ${this.player1.name} and ${this.player2.name}!`);
            return 2;
        }
        else{
            console.log(`\nWelcome ${this.player1.name}!`);
            return 1;
        }
    }



    aiRandomChoice(object){
        let aiChoice = Math.round(Math.random() * 5);
        console.log(object.choice[aiChoice]);
        return aiChoice; 
    }

    gameMechanics(player, playerInput1, otherPlayer, playerInput2){
        if(playerInput1 === playerInput2){
                console.log(`You both choose ${player.choice[playerInput1]}, play again.`)
                this.gameMechanics(this.player1, this.player1.getPlayerChoice(), this.player2, this.player2.getPlayerChoice());
        }
        else if((playerInput1 === 0 || playerInput1 === 1) && (playerInput2 === 0 || playerInput2 === 1)){
            console.log("Paper covers Rock!");
            if(playerInput1 === 1){
                player.points ++
                console.log(`${player.name} scores a point and has ${player.points}`);

            }
            else if(playerInput2 === 1){
                otherPlayer.points ++
                console.log(`${otherPlayer.name} scores a point and has ${otherPlayer.points}`);
            }
        }
        if(player.points / this.rounds < 0.5 && otherPlayer.points / this.rounds < 0.5){
            
            this.gameMechanics(this.player1, this.player1.getPlayerChoice(), this.player2, this.player2.getPlayerChoice());
        }  
    }
}    



module.exports = {
    Game: Game
}