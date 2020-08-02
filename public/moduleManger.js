import { getUni, getUser } from './GetUser.js'; 


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







