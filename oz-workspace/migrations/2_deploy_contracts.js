var TutorialToken = artifacts.require("./TutorialToken.sol");
var TutorialCrowdsale = artifacts.require("./TutorialCrowdsale.sol");

module.exports = function (deployer, network, accounts) {

  deployer.deploy(TutorialToken).then(() => {

    return TutorialToken.deployed().then(tokenInstance => {


      const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1 // one second in the future
      // const startTime = 1518931829
      const endTime = startTime + (3600 * .5) // half an hour
      const goal = web3.toWei(30, "ether");
      const cap = web3.toWei(1200, "ether");
      const rate = new web3.BigNumber(1000)
      const wallet = accounts[0]

      // deployer.link(TutorialToken, TutorialCrowdsale);
      console.log("TutorialToken.address:", tokenInstance.address)

      return deployer.deploy(TutorialCrowdsale, startTime, endTime, rate, goal, cap, wallet, tokenInstance.address).then(() => {

        return TutorialCrowdsale.deployed().then(crowdsale => {

          return tokenInstance.setController(crowdsale.address).then(() => {

            return crowdsale.token().then(token => {

              // crowdsale.connectedTokenAddress().then(connectedAddress => {
              console.log("CrowdsaleToken:", token);
              //   console.log("ConnectedAddress:", connectedAddress);
              // });
            });
          });
        })

      })

    });
  });

};
