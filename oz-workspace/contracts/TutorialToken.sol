pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract TutorialToken is MintableToken {
  string public name = "TutorialToken";
  string public symbol = "TT";
  uint8 public decimals = 18;
  //uint public INITIAL_SUPPLY = 12000;

  function TutorialToken() public {
    //balances[msg.sender] = INITIAL_SUPPLY;
  }

}
