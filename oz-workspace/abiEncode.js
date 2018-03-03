#!/usr/bin/env node

var Web3 = require('web3')
var web3 = new Web3("http://localhost:8545");


var parameterTypes = ["uint256", "uint256", "uint256", "uint256", "uint256", "address", "address" ];
var parameterValues = [
		parseInt(new Date().getTime()/1000)+60,
		parseInt(new Date().getTime()/1000)+(60*30),
		"10000000000000000",
		"100000000000000000",
		"1000000000000000000",
		"0x627306090abab3a6e1400e9345bc60c78a8bef57",
		"0x7f52803953f538d1b830a81ba4fac995874e855b"
	];

var encoded = web3.eth.abi.encodeParameters(parameterTypes, parameterValues)

console.log("Encoded:", encoded);
console.log("Raw:", JSON.stringify(parameterValues));
