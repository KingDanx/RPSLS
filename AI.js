"use strict";
const {Player} = require("./Player");

class AI extends Player{
    constructor(name){
        super(name);
    }
}

module.exports = {
    AI: AI  
}