
//  firebase.auth().signOut().then(function() {
//         var errorBox = document.getElementById("errorBox");
//         errorBox.innerHTML = '<pre class="infoBox warning--block">	<p style="color:white; align-content: center">Previous User Logged Out.</p></pre>';      
//     }).catch(function(error) {
//         // An error happened.
//         var errorBox = document.getElementById("errorBox");
//         var errorMessage = error.message;
//         errorBox.innerHTML = '<pre class="warningBox warning--block">	<p style="color:white; align-content: center">' + errorMessage +'</p></pre>';
//     });

function login(){
    var userEmail = document.getElementById("email").value;
    var userPassword = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(function(){
        window.location.href = "index.html"
        document.getElementById("errorBox").style.display = "none";
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.error(errorMessage);
        var errorBox = document.getElementById("errorBox");
        errorBox.style.display = "block";
        errorBox.innerHTML = '<pre class="warningBox warning--block">	<p style="color:white; align-content: center">' + errorMessage +'</p></pre>';
    });
}


function register(){
  var userUni = document.getElementById("uni").value;
  var userUserName = document.getElementById("email").value;
  var userPassword = document.getElementById("password").value;
  var userEmail = userUserName + userUni;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then(function(){
     var user = firebase.auth().currentUser;

     user.sendEmailVerification().then(function() {
        document.getElementById("register").style.display = "none";
        document.getElementById("confirm-email").style.display = "block";
        document.getElementById("errorBox").style.display = "none";
     }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
  
        console.error(errorMessage);
        var errorBox = document.getElementById("errorBox");
        errorBox.style.display = "block";
        errorBox.innerHTML = '<pre class="warningBox warning--block">	<p style="color:white; align-content: center">' + errorMessage +'</p></pre>';
     });

  }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.error(errorMessage);
      var errorBox = document.getElementById("errorBox");
      errorBox.innerHTML = '<pre class="warningBox warning--block">	<p style="color:white; align-content: center">' + errorMessage +'</p></pre>';
   });
}

