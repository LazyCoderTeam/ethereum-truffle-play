pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

// import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract TutorialToken is MintableToken {
  string public name = "TutorialToken";
  string public symbol = "TT";
  uint8 public decimals = 18;
  //uint public INITIAL_SUPPLY = 12000;

  address controller = address(0);

  function TutorialToken() public {
    //balances[msg.sender] = INITIAL_SUPPLY;
  }

  function setController(address newController) public justOwner {
    controller = newController;
  }
  modifier justOwner() {
    require(msg.sender == owner);
    _;
  }
  
  modifier onlyOwner() {
    if (msg.sender == address(0) || (msg.sender != owner && msg.sender != controller)) {
      require(false); // error for uncontrolled request
    }
    _;
  }
}
