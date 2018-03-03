const path = require('path');
const fs = require('fs');
const solc = require('solc');

const shelljs = require('shelljs');

var compilations = {};

module.exports = async (contract) => {
  if (!compilations[contract]){
    //var npm = await shelljs.exec("npm install",{silent: true});
    var code = await shelljs.exec("truffle-flattener " + path.join("./contracts/", contract), {silent: true})
    code = code.toString();
    var compiledObject = solc.compile(code, 1);
    compiledObject.sourceCode = code;
    compilations[contract] = compiledObject;
  }
  return compilations[contract];
};
