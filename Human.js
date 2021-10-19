"use strict";
const prompt = require("prompt-sync")();
const {Player} = require("./Player");

class Human extends Player{
    constructor(name){
        super(name);
    }

    setName(){
        console.log(`${this.name}, enter your desired name: `);
        this.name = prompt();
        return this.name;
    }
    
    getPlayerChoice(){
        console.log(`${this.name}, choose "Rock", "Paper", "Scissors", "Lizard", or "Spock".`);
        let userInput = prompt();
        userInput = userInput.toLowerCase().trim();
        switch (userInput) {
            case "rock":
                return 0
            case "paper":
                return 1
            case "scissors":
                return 2
            case "lizard":
                return 3
            case "spock":
                return 4
        
            default:
                console.log("Invalid input. Try again.");
                this.getPlayerChoice();
                break;
        }
    }
}

module.exports = {
    Human: Human  
}