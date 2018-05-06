$(document).ready(function() {

    var fbLoggedIn = false;

    $(document).on('fbload', function() {
        console.log("fbload event fired")
        FB.getLoginStatus(function(response) {
          console.log(response);
          fbLoggedIn = response['status'] == 'connected';
        });
        checkMetaMask();

      });

    function checkMetaMask() {
                        console.log('CHECKMETAMASK');

        setInterval(function() {
            web3.eth.getAccounts(function(err, accounts){
                if (err != null) console.error("An error occurred: "+err);
                else if (accounts.length == 0) {
                    console.log('not-logedin');
                    $("div#metamask-not-loggedin").css({'visibility': 'visible'});
                    $("div#metamask-loggedin").css({'visibility': 'hidden'});
                }
                else {
                    console.log('logedin');
                    $('div#metamask-loggedin').css({'visibility': 'visible'});
                    $('div#metamask-not-loggedin').css({'visibility': 'hidden'});
                    if (fbLoggedIn) {
                        console.log("User Logged In");
                        $('.fb-credentials-container').html('FB Authorized').show();
                        $.getJSON("https://graph.facebook.com/v3.0/" + response['authResponse']['userID'] + "/friends?access_token=" + response['authResponse']['accessToken'], function(data) {
                          var num_friends = data['summary']['total_count'];
                          $('#fb-friends-count').html(num_friends);
                          $('#fb-friends-container').show();

                        });
                    } else {
                        $('.fb-login-container').show();
                    }
                }
            });
        }, 1000);
    }

    $( "#logout-facebook" ).click(function() {
        FB.logout(function(response) {
          console.log("User logged out.: ");
        });
    });

    function loginUser() {
      console.log("CLICKED!");
      FB.getLoginStatus(function(response) {
        console.log("checking the login status: ", response);
        statusChangeCallback(response);
      });
    }


  //    var account = web3.eth.accounts[0];


});




//$(document).on('fbload', function() {
//    console.log("fbload event fired")
//    FB.getLoginStatus(function(response) {
//      console.log(response);
//      if (response['status'] == 'connected') {
//        console.log("User Logged In");
//        $('.fb-credentials-container').html('FB Authorized').show();
//        console.log(response['authResponse']['accessToken'])
//        console.log(response['authResponse']['userID'])
//        $.getJSON("https://graph.facebook.com/v3.0/" + response['authResponse']['userID'] + "/friends?access_token=" + response['authResponse']['accessToken'], function(data) {
//          var num_friends = data['summary']['total_count'];
//          $('#fb-friends-count').html(num_friends);
//          $('#fb-friends-container').show();
//        });
//      }
//      else {
//        console.log("User not logged in");
//        $('.fb-login-container').show();
//      }
//    });
//  });

