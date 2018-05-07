$(document).ready(function() {


    var fbLoggedIn = false;
    var fbResponse;


    $(document).on('fbload', function() {
        console.log("fbload event fired")
        FB.getLoginStatus(function(response) {
          console.log(response);
          fbLoggedIn = (response['status'] == 'connected');
          fbResponse = response;
        });
        checkMetaMask();
      });

    function checkMetaMask() {
        setInterval(function() {
            web3.eth.getAccounts(function(err, accounts){
                if (err != null) console.error("An error occurred: "+err);
                else if (accounts.length == 0) {
                    console.log('not-logedin');
                    $("div#matamask-not-loggedin").css('visibility', 'visible');
                    $('.fb-login-container').hide();
                    $('#fb-friends-container').hide();
                    $('.fb-credentials-container').html('FB Authorized').hide();

                }
                else {
                    console.log('logedin');
                    $("div#matamask-not-loggedin").css('visibility', 'hidden');
                    if (fbLoggedIn) {
                        $('.fb-login-container').hide();
                        $('.fb-credentials-container').html('FB Authorized').show();
                        $.getJSON("https://graph.facebook.com/v3.0/" + fbResponse['authResponse']['userID'] +
                            "/friends?access_token=" + fbResponse['authResponse']['accessToken'], function(data) {
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
          console.log("User logged out. ");
        });
    });

    function loginUser() {
      console.log("CLICKED!");
      FB.getLoginStatus(function(response) {
        console.log("checking the login status: ", response);
        statusChangeCallback(response);
      });
    }

});
