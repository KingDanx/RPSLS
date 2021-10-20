"use strict";
const prompt = require("prompt-sync")();
const {Player} = require("./Player");

class Human extends Player{
    constructor(name){
        super(name);
    }

    setName(playerName){
        console.log(`\n${this.name}, enter your desired name: `);
        this.name = prompt();
        this.name = this.name.trim();
        if(this.name.length < 1){
            console.log("Invailid input. Try again.");
            this.name = playerName
            return this.setName(playerName);
        }
        return this.name;
    }
    
    getPlayerChoice(){
        let userInput = prompt.hide((`${this.name}, choose "Rock", "Paper", "Scissors", "Lizard", or "Spock" : `));
        userInput = userInput.toLowerCase().trim();
        switch (userInput) {
            case "rock":
                this.gesture = userInput;
                break;
            case "paper":
                this.gesture = userInput;
                break;
            case "scissors":
                this.gesture = userInput;
                break;
            case "lizard":
                this.gesture = userInput;
                break;
            case "spock":
                this.gesture = userInput;
                break;
        
            default:
                console.log("Invalid input. Try again.");
                return this.getPlayerChoice();
        }
    }
}

module.exports = {
    Human: Human  
}