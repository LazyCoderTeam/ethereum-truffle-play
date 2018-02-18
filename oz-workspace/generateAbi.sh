#!/usr/bin/env node

var mergeJson = require('merge-json');


var tutCrowdsale = require('./build/contracts/TutorialCrowdsale.json');
var crowdsale = require('./build/contracts/Crowdsale.json');

var tutToken = require('./build/contracts/TutorialToken.json');
var mintableToken = require('./build/contracts/MintableToken.json');




console.log("Contract",tutCrowdsale.networks["4447"].address);
console.log(JSON.stringify(mergeJson.merge(tutCrowdsale.abi, crowdsale.abi)));



console.log("\n");


console.log("Contract",tutToken.networks["4447"].address);
console.log(JSON.stringify(mergeJson.merge(mintableToken.abi, tutToken.abi)));
