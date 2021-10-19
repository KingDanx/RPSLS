"use strict";
const prompt = require("prompt-sync")();
const {Game} = require("./Game");

function newGame(){
    console.log("Welcome to Rock, Paper Scissors, Lizard, Spock! \nChoose game mode. Press 1 for PvP press 2 for PvE");
    let userInput = prompt();
    userInput = userInput.trim();
    switch (userInput) {
        case "1":
            let humanVsHuman = new Game(3, 2);
            determinePlayers(humanVsHuman, humanVsHuman.player1.name, humanVsHuman.player2.name);
            humanVsHuman.main();
        break;
        case "2":
            let humanVsAi = new Game(3, 1);
            humanVsAi.main();
        break;
    
        default:
            console.log("Invalid input. Try again.");
            newGame();
            break;
    }
}

function determinePlayers(game, playerName, playerName2){
    game.player1.name = game.player1.setName(playerName);

    if(game.playerNumber > 1){
        game.player2.name = game.player2.setName(playerName2);
        console.log(`\nWelcome ${game.player1.name} and ${game.player2.name}!`);
        return 2;
    }
    else{
        console.log(`\nWelcome ${game.player1.name}!`);
        return 1;
    }
}

newGame();
