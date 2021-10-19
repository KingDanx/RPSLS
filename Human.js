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
}

module.exports = {
    Human: Human  
}