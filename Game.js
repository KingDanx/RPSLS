"use strict";
const prompt = require("prompt-sync")();
const {AI} = require("./AI");
const {Human} = require("./Human");

class Game{
    constructor(rounds){
        this.rounds = rounds;
        this.playerNumber;
        this.roundCounter = 1;
        this.player1 = new Human("Player 1");
        this.player2 = new Human("Player 2");
        this.ai = new AI("Robot");
    }

    newGame(){
        console.log(`\nWelcome to Rock, Paper Scissors, Lizard, Spock! \nChoose game mode. Press "1" for PvP press "2" for PvE`);
        let userInput = prompt();
        userInput = userInput.trim();
        switch (userInput) {
            case "1":
                this.playerNumber = 2;
                this.determinePlayers(this.player1.name, this.player2.name);
                this.roundAnnounce(this.player2);
                this.main();
            break;
            case "2":
                this.playerNumber = 1;
                this.determinePlayers(this.player1.name, this.ai.name);
                this.roundAnnounce(this.ai);
                this.main();
            break;
        
            default:
                console.log("Invalid input. Try again.");
                this.newGame();
                break;
        }
    }
    
    main(){
        if(this.playerNumber === 1){
            this.player1.getPlayerChoice();
            this.ai.getPlayerChoice();
            this.gameMechanics(this.ai);
        }
        else{
            this.player1.getPlayerChoice();
            this.player2.getPlayerChoice();
            this.gameMechanics(this.player2);
        }
     }

    determinePlayers(playerName, playerName2){
        this.player1.name = this.player1.setName(playerName);
    
        if(this.playerNumber > 1){
            this.player2.name = this.player2.setName(playerName2);
            console.log(`\nWelcome ${this.player1.name} and ${this.player2.name}!`); 
        }
        else{
            console.log(`\nWelcome ${this.player1.name}!`);
        }
    }

    gameMechanics(otherPlayer){
        if(this.player1.gesture === otherPlayer.gesture){
                console.log(`You both choose ${this.player1.gesture}, play again.`);
                return this.main();
        }
        this.comparerator("paper", "rock", "\nPaper covers Rock", otherPlayer);
        this.comparerator(`scissors`, `paper`, "\nScissors cuts Paper", otherPlayer);
        this.comparerator(`rock`, `scissors`, "\nRock crushes Scissors", otherPlayer);
        this.comparerator(`rock`, `lizard`, "\nRock crushes Lizard", otherPlayer);
        this.comparerator(`lizard`, `spock`, "\nLizard poisons Spock", otherPlayer);
        this.comparerator(`spock`, `scissors`, "\nSpock smashes Scissors", otherPlayer);
        this.comparerator(`scissors`, `lizard`, "\nScissors decapitates Lizard", otherPlayer);
        this.comparerator(`lizard`, `paper`, "\nLizard eats Paper", otherPlayer);
        this.comparerator(`paper`, `spock`, "\nPaper disproves Spock", otherPlayer);
        this.comparerator(`spock`, `rock`, "\nSpock vaporizes Rock", otherPlayer);

        this.roundCheck(otherPlayer);
    }

    comparerator(winner, looser, string, otherPlayer){
        if((this.player1.gesture == winner || this.player1.gesture == looser) && (otherPlayer.gesture == winner || otherPlayer.gesture == looser)){
            console.log(string);
            if(this.player1.gesture == winner){
                this.player1.points++;
                console.log(`${this.player1.name} scores a point and has ${this.player1.points}\n`);
            }
            else if(otherPlayer.gesture == winner){
                otherPlayer.points++;
                console.log(`${otherPlayer.name} scores a point and has ${otherPlayer.points}\n`);
            }
        }
    }

    roundCheck(otherPlayer){
        if(this.roundAnnounce(otherPlayer) === true){
            this.main();
        }
        else{
            if(this.player1.points > otherPlayer.points){
                console.log(`${this.player1.name} is the winner!\n`);
                this.playAgain()
                
            }
            else{
                console.log(`${otherPlayer.name} is the winner!\n`);
                this.playAgain()
                
            }
        }  
    }
    
    roundAnnounce(otherPlayer){
        if((this.player1.points / this.rounds) < 0.5 && (otherPlayer.points / this.rounds) < 0.5){
            console.log(`Round ${this.roundCounter} of ${this.rounds}:\n\n${this.player1.name}'s Points: ${this.player1.points}\n${otherPlayer.name}'s Points: ${otherPlayer.points}\n`);
            this.roundCounter++
            return true;
        }
    }

    playAgain(){
        console.log(`\nDo you want to play again? Type "yes" or "no"`);
        let userInput = prompt();
        userInput = userInput.trim().toLowerCase();
        if(userInput === "yes"){
            this.player1.points = 0;
            this.player2.points = 0;
            this.ai.points = 0;
            this.roundCounter = 1;
            this.player1.name = "Player 1";
            this.player2.name = "Player 2";
            this.newGame();
        }
        else if(userInput === "no"){
            return;
        }
        else{
            console.log("Invalid input. Try again.");
            this.playAgain();
        }
    }
}    

module.exports = {
    Game: Game
}