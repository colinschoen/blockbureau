$(document).ready(function() {


    const EthQuery = require('ethjs-query');
    const EthContract = require('ethjs-contract');
    const abi = require('../json/BlockBureau.json')['abi'];
    const address = '0x18a06678625BE7191a26EB69606DcAc53B8271e7';
    var userToken, UserToken;
    var fbLoggedIn = false;
    var fbResponse;

    startApp(web3);

    function startApp(web3) {
      const eth = new EthQuery(web3.currentProvider);
      const contract = new EthContract(eth);
      initContract(contract);
    }

    function initContract (contract) {
      UserToken = contract(abi)
      userToken = UserToken.at(address)
    }

    $(document).on('fbload', function() {
            console.log("fbloaded!")
            FB.getLoginStatus(function(response) {
              fbLoggedIn = (response['status'] == 'connected');
              fbResponse = response;
            });
     });

    setInterval(function() {
        if (FB) {
            FB.getLoginStatus(function(response) {
              fbLoggedIn = (response['status'] == 'connected');
              fbResponse = response;
            });
        }
        getWeb3Accounts();
    }, 1000);

    function getWeb3Accounts() {
        web3.eth.getAccounts(function(err, accounts){
            if (err != null) console.error("An error occurred: "+err);
            else if (accounts.length == 0) {
                uiUpdatesMMLoggedOut();
            }
            else {
                uiUpdatesMMLoggedin();
                console.log('accounts:',  accounts);
                if (fbLoggedIn) {
                    console.log("logged into facebook")
                    $('.fb-login-container').hide();
                    $('.fb-credentials-container').html('FB Authorized').show();

                    userToken.get_fb_friends(fbResponse['authResponse']['userID'], fbResponse['authResponse']['userID'],
                        {from: address[0]})
                    .then(function (txHash) {
                          console.log('Transaction sent')
                          console.dir(txHash)
                          waitForTxToBeMined(txHash)
                    })
                    . catch (console.error)

//                    $.getJSON("https://graph.facebook.com/v3.0/" + fbResponse['authResponse']['userID'] +
//                        "/friends?access_token=" + fbResponse['authResponse']['userID'], function(data) {
//                      var num_friends = data['summary']['total_count'];
//                      $('#fb-friends-count').html(num_friends);
//                      $('#fb-friends-container').show();
//                    });
                } else {
                    console.log("NOT logged in of facebook")
                    $('.fb-login-container').show();
                }
            }
        });
    }

    async function waitForTxToBeMined (txHash) {
      let txReceipt
      while (!txReceipt) {
        try {
          txReceipt = await eth.getTransactionReceipt(txHash)
        } catch (err) {
          return console.err
        }
      }
      console.log('SUCCESS: ', txReceipt);
    }

    function uiUpdatesMMLoggedOut() {
        $("div#matamask-not-loggedin").css('visibility', 'visible');
        $('#fb-friends-container').hide();
        $('.fb-credentials-container').html('FB Authorized').hide();
        $("div#matamask-loggedin").css('visibility', 'hidden');
    }

    function uiUpdatesMMLoggedin() {
        $("div#matamask-loggedin").css('visibility', 'visible');
        $("div#matamask-not-loggedin").css('visibility', 'hidden');
    }


    $( "#logout-facebook" ).click(function() {
        FB.logout(function(response) {
          console.log("User logged out. ");
        });
    });


});
