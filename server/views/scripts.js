function onSignIn(googleUser) {
    // Get the user's ID token and basic profile information
    var id_token = googleUser.getAuthResponse().id_token;
    var profile = googleUser.getBasicProfile();
  
    // Send the ID token and profile information to your server to create a new user account
    // You can use fetch or XMLHttpRequest to send the data to your server
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://yourserver.com/register');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Registration was successful
        var message = document.getElementById("message");
        message.innerHTML = "Welcome, " + profile.getName() + "! Your account has been created.";
      } else {
        // Registration failed
        console.error('Registration failed: ' + xhr.status);
      }
    };
    xhr.send(JSON.stringify({
      id_token: id_token,
      email: profile.getEmail(),
      name: profile.getName()
    }));
  }
  