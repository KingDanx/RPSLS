"use strict";
const prompt = require("prompt-sync")();
const {AI} = require("./AI");
const {Human} = require("./Human");
const {Player} = require("./Player");

class Game{
    constructor(rounds, playerNumber){
        this.rounds = rounds;
        this.playerNumber = playerNumber;
        this.roundCounter = 2;
        this.player1 = new Human("Player 1");
        this.player2 = new Human("Player 2");
        this.ai = new AI("Robot");
    }

    main(){
       if(this.playerNumber === 1){
            this.gameMechanics(this.player1, this.player1.getPlayerChoice(), this.ai, this.ai.aiRandomChoice(ai));
       }
       else{
           this.gameMechanics(this.player1, this.player1.getPlayerChoice(), this.player2, this.player2.getPlayerChoice());
       }
    }

    gameMechanics(player, playerInput1, otherPlayer, playerInput2){
        if(playerInput1 === playerInput2){
                console.log(`You both choose ${player.choice[playerInput1]}, play again.`)
                this.main();
        }
        console.log("\nPaper covers Rock!");
        this.comparerator(playerInput1, playerInput2, 1, 0);

        this.roundCheck(player, otherPlayer);
    }

    comparerator(userInput1, userInput2, winner, looser){
        if((userInput1 === winner || userInput1 === looser) && (userInput2 === winner || userInput2 === looser)){
            if(userInput1 === winner){
                this.player1.points ++
                console.log(`${this.player1.name} scores a point and has ${this.player1.points}\n`);
            }
            else if(userInput2 === winner){
                this.player2.points ++
                console.log(`${this.player2.name} scores a point and has ${this.player2.points}\n`);
            }
        }
    }

    roundCheck(player, otherPlayer){
        if(player.points / this.rounds < 0.5 && otherPlayer.points / this.rounds < 0.5){
            console.log(`Round ${this.roundCounter} of ${this.rounds}:\n\n${player.name}'s Points: ${player.points}\n${otherPlayer.name}'s Points: ${otherPlayer.points}\n`);
            this.roundCounter++
            this.main();
        }
        else{
            if(player.points > otherPlayer.points){
                console.log(`${player.name} is the winner!`);
            }
            else{
                console.log(`${otherPlayer.name} is the winner!`);
            }
        }  
    }
}    



module.exports = {
    Game: Game
}