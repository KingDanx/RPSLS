"use strict";
const {Player} = require("./Player");

class AI extends Player{
    constructor(name){
        super(name);
    }

    getPlayerChoice(){
        this.gesture = this.choice[Math.round(Math.random() * (this.choice.length - 1))];
        this.gesture = this.gesture.toLowerCase().trim();
    }
}

module.exports = {
    AI: AI  
}