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
                this.roundAnnounce(this.player1, this.player2);
                this.main();
            break;
            case "2":
                this.playerNumber = 1;
                this.determinePlayers(this.player1.name, this.ai.name);
                this.roundAnnounce(this.player1, this.ai);
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
            this.gameMechanics();
        }
        else{
            this.player1.getPlayerChoice();
            this.player2.getPlayerChoice();
            this.gameMechanics();
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

    gameMechanics(){
        if(this.player1.gesture === this.player2.gesture){
                console.log(`You both choose ${this.player1.gesture}, play again.`);
                return this.main();
        }
        this.comparerator("paper", "rock", "\nPaper covers Rock");
        this.comparerator(`scissors`, `paper`, "\nScissors cuts Paper");
        this.comparerator(`rock`, `scissors`, "\nRock crushes Scissors");
        this.comparerator(`rock`, `lizard`, "\nRock crushes Lizard");
        this.comparerator(`lizard`, `spock`, "\nLizard poisons Spock");
        this.comparerator(`spock`, `scissors`, "\nSpock smashes Scissors");
        this.comparerator(`scissors`, `lizard`, "\nScissors decapitates Lizard");
        this.comparerator(`lizard`, `paper`, "\nLizard eats Paper");
        this.comparerator(`paper`, `spock`, "\nPaper disproves Spock");
        this.comparerator(`spock`, `rock`, "\nSpock vaporizes Rock");

        this.roundCheck();
    }

    comparerator(winner, looser, string){
        if((this.player1.gesture == winner || this.player1.gesture == looser) && (this.player2.gesture == winner || this.player2.gesture == looser)){
            console.log(string);
            if(this.player1.gesture == winner){
                this.player1.points++;
                console.log(`${this.player1.name} scores a point and has ${this.player1.points}\n`);
            }
            else if(this.player2.gesture == winner){
                this.player2.points++;
                console.log(`${this.player2.name} scores a point and has ${this.player2.points}\n`);
            }
        }
    }

    roundCheck(){
        if(this.roundAnnounce() === true){
            this.main();
        }
        else{
            if(this.player1.points > this.player2.points){
                console.log(`${this.player1.name} is the winner!\n`);
                this.playAgain()
                
            }
            else{
                console.log(`${this.player2.name} is the winner!\n`);
                this.playAgain()
                
            }
        }  
    }
    roundAnnounce(){
        if((this.player1.points / this.rounds) < 0.5 && (this.player2.points / this.rounds) < 0.5){
            console.log(`Round ${this.roundCounter} of ${this.rounds}:\n\n${this.player1.name}'s Points: ${this.player1.points}\n${this.player2.name}'s Points: ${this.player2.points}\n`);
            this.roundCounter++
            return true;
        }
    }

    playAgain(){
        console.log(`\nDo you want to play again? Type "yes" or "no"`);
        let userInput = prompt();
        userInput = userInput.trim().toLowerCase();
        if(userInput === "yes"){
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