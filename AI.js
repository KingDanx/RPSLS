"use strict";
const {Player} = require("./Player");

class AI extends Player{
    constructor(name){
        super(name);
    }

    aiRandomChoice(object){
        let aiChoice = Math.round(Math.random() * 5);
        console.log(object.choice[aiChoice]);
        return aiChoice; 
    }
}

module.exports = {
    AI: AI  
}