"use strict";
const prompt = require("prompt-sync")();
const {AI} = require("./AI");
const {Human} = require("./Human");

class Game{
    constructor(rounds){
        this.rounds = rounds;
        this.playerNumber;
        this.roundCounter = 1;
    }

    newGame(){
        console.log(`\nWelcome to Rock, Paper, Scissors, Lizard, Spock! \nChoose game mode. Enter "1" for single player, "2" for multiplayer, or "3" to exit.`);
        let userInput = prompt();
        userInput = userInput.trim();
        switch (userInput) {
            case "1":
                this.playerNumber = 1;
                this.player1 = new Human("Player 1");
                this.player2 = new AI("Robot");
                this.namePlayers(this.player1.name, this.player2.name);
                this.roundAnnounce();
                this.main();
            break;
            case "2":  
                this.playerNumber = 2;
                this.player1 = new Human("Player 1");
                this.player2 = new Human("Player 2");
                this.namePlayers(this.player1.name, this.player2.name);
                this.roundAnnounce();
                this.main();
            break;
            case "3":
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
            this.player2.getPlayerChoice();
            this.gameMechanics();
        }
        else{
            this.player1.getPlayerChoice();
            this.player2.getPlayerChoice();
            this.gameMechanics();
        }
     }

    namePlayers(){
        this.player1.setName(this.player1.name);
    
        if(this.playerNumber > 1){
            this.player2.setName(this.player2.name);
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
        this.comparerator(`${this.player1.choice[1]}`, `${this.player1.choice[0]}`, `\nPaper covers Rock`);
        this.comparerator(`${this.player1.choice[2]}`, `${this.player1.choice[1]}`, "\nScissors cuts Paper");
        this.comparerator(`${this.player1.choice[0]}`, `${this.player1.choice[2]}`, "\nRock crushes Scissors");
        this.comparerator(`${this.player1.choice[0]}`, `${this.player1.choice[3]}`, "\nRock crushes Lizard");
        this.comparerator(`${this.player1.choice[3]}`, `${this.player1.choice[4]}`, "\nLizard poisons Spock");
        this.comparerator(`${this.player1.choice[4]}`, `${this.player1.choice[2]}`, "\nSpock smashes Scissors");
        this.comparerator(`${this.player1.choice[2]}`, `${this.player1.choice[3]}`, "\nScissors decapitates Lizard");
        this.comparerator(`${this.player1.choice[3]}`, `${this.player1.choice[1]}`, "\nLizard eats Paper");
        this.comparerator(`${this.player1.choice[1]}`, `${this.player1.choice[4]}`, "\nPaper disproves Spock");
        this.comparerator(`${this.player1.choice[4]}`, `${this.player1.choice[0]}`, "\nSpock vaporizes Rock");

        this.roundCheck();
    }

    comparerator(winner, looser, string){
        if((this.player1.gesture == winner || this.player1.gesture == looser) && (this.player2.gesture == winner || this.player2.gesture == looser)){
            console.log(`\n${this.player1.name}: ${this.player1.gesture}\n${this.player2.name}: ${this.player2.gesture}`);
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
        if((this.player1.points / this.rounds) <= 0.5 && (this.player2.points / this.rounds) <= 0.5){
            console.log(`Round ${this.roundCounter} of ${this.rounds}:\n\n${this.player1.name}'s Points: ${this.player1.points}\n${this.player2.name}'s Points: ${this.player2.points}\n`);
            this.roundCounter++
            return true;
        }
    }

    playAgain(){
        console.log(`Do you want to play again? Type "yes" or "no"`);
        let userInput = prompt();
        userInput = userInput.trim().toLowerCase();
        if(userInput === "yes"){
            let newerGame = new Game(3);
            newerGame.newGame();
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