App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
      console.log("Provider:", web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
      console.log("Provider ?:", web3.currentProvider);

    }

    return App.initContract();
  },

  initContract: function () {
    $.getJSON('TutorialCrowdsale.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var TutorialCrowdsaleArtifact = data;
      App.contracts.TutorialCrowdsale = TruffleContract(TutorialCrowdsaleArtifact);

      // Set the provider for our contract.
      App.contracts.TutorialCrowdsale.setProvider(App.web3Provider);

      App.contracts.TutorialCrowdsale.deployed().then(instance => {


        $.getJSON('TutorialToken.json', function (data) {
          // Get the necessary contract artifact file and instantiate it with truffle-contract.

          var TutorialTokenArtifact = data;
          App.contracts.TutorialToken = TruffleContract(TutorialTokenArtifact);

          // Set the provider for our contract.
          App.contracts.TutorialToken.setProvider(App.web3Provider);

          instance.token().then(address => {

            console.log("instance.token()", address);
            var TutorialCrowdsaleTokenArtifact = data;
            App.contracts.TutorialCrowdsaleToken = TruffleContract(TutorialCrowdsaleTokenArtifact);

            // Set the provider for our contract.
            App.contracts.TutorialCrowdsaleToken.setProvider(App.web3Provider);

            return App.getBalances();
          });

        });
      })

    });



    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on('click', '#transferButton', App.handleTransfer);
  },

  handleTransfer: function (event) {
    event.preventDefault();

    var amount = parseInt($('#TTTransferAmount').val());
    var toAddress = $('#TTTransferAddress').val();

    var tutorialTokenInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      window.App = App
      App.contracts.TutorialCrowdsale.deployed().then(function (instance) {

        tutorialTokenInstance = instance;
        return instance.token().then(addr => {
          tokenAddress = addr
          // return tutorialTokenInstance.send(web3.toWei(amount, "ether"))
          return tutorialTokenInstance.buyTokens(account, { value: web3.toWei(amount, "ether") });
          // return tutorialTokenInstance.send(amount)
        });

      }).then(function (result) {
        $('#TTResult').text(JSON.stringify(result,null,2));
        return App.getBalances();
      }).catch(function (err) {
        console.log(err);
      });
    });
  },

  getBalances: function () {
    console.log('Getting balances...');


    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      App.contracts.TutorialToken.deployed().then(function (instance) {
        var tutorialTokenInstance = instance;

        console.log("Balance from :", account);
        return tutorialTokenInstance.balanceOf(account);
      }).then(function (result) {
        console.log("Result:", result);
        let balance = result.c[0];

        $('#TTBalance').text(balance);
      }).catch(function (err) {
        console.log(err.message);
      });

      App.contracts.TutorialCrowdsaleToken.deployed().then(function (instance) {
        var tutorialTokenInstance = instance;

        console.log("Balance from :", account);
        return tutorialTokenInstance.balanceOf(account);
      }).then(function (result) {
        console.log("Result:", result);
        let balance = result.c[0];

        $('#TTContractBalance').text(balance);
      }).catch(function (err) {
        console.log(err.message);
      });

      App.contracts.TutorialCrowdsale.deployed().then(function (instance) {
        var tutorialCrowdsaleInstance = instance;

        console.log("Balance from :", tutorialCrowdsaleInstance.wallet());
        return tutorialCrowdsaleInstance.wallet().then(wallet => {
          return wallet.balance;
        });
      }).then(function (result) {
        console.log("Result:", result);
        let balance = result;

        $('#TTContractBalance').text(balance);
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});











