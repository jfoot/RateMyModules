
function createNewModule() {
  getUser(createNewModuleAtUni)
}



function createNewModuleAtUni(user) {
  firebase.database().ref(getUni(user) + "/Modules/" + document.getElementById("id").value).set({
    description: document.getElementById("description").value,
    lecturer: document.getElementById("lecturer").value,
    simpleName :document.getElementById("name").value,
    school : document.getElementById("school").value
  }).catch(function(error) {
    console.log(error.message)

      if(error.code == "PERMISSION_DENIED"){

      }
  });
}

function submitResults(){
  getUser(submitResultsAtUni)
}


function submitResultsAtUni(user){
  firebase.database().ref(getUni(user) + "/Ratings/" + document.getElementById("id").value + "/" + user.uid).set({
    overall: Number(document.getElementById("avgRate").value),
 
  }).catch(function(error) {
    console.log(error.message)

      if(error.code == "PERMISSION_DENIED"){

      }
  });
}

function getUser(callback){
  firebase.auth().onAuthStateChanged(function(user) {   
    if (user) {
        console.log(user);
        callback(user);     
    } else {   
        console.error("User not logged in!");
    }
  });
}


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


