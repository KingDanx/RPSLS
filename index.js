"use strict";
const prompt = require("prompt-sync")();
const {Game} = require("./Game");

function chooseMode(){
    console.log("Welcome to Rock, Paper Scissors, Lizard, Spock! \nChoose game mode. Press 1 for PvP pres 2 for PvE");
    let userInput = prompt();
    switch (userInput) {
        case "1":
            let humanVsHuman = new Game(3, 2);
            humanVsHuman.main();
        break;
        case "2":
            let humanVsAi = new Game(3, 1);
            humanVsAi.main();
        break;
    
        default:
            console.log("Invalid input. Try again.");
            chooseMode();
            break;
    }
}

chooseMode();

