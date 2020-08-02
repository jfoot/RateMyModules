/*
  Gets the branch in the database for the University the account is associated with.
*/
function getUni(user){
    var email = user.email;

    if(email.includes("@nottingham.ac.uk")){
      return "Nottingham";
    }
    else if(email.includes("@bristol.ac.uk")){
      return "Bristol";
    }    
    else{
      //Backend will also block them. :)
      console.error("Not a supported university.");
      return "";
    }
}


function getUser(callback){
  firebase.auth().onAuthStateChanged(function(user) {   
    if (user) {
        console.log(user);
        callback(user);     
    } else {   
        console.error("User not logged in!");
        callback(user);     
    }
  });
}


