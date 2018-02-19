pragma solidity ^0.4.17;

import "zeppelin-solidity/contracts/crowdsale/Crowdsale.sol";


contract TutorialTokenHolder {
  address public connectedTokenAddress;

  function TutorialTokenHolder(address connectedToken) public {
    connectedTokenAddress = connectedToken;
  }
}
