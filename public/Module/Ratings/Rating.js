let params = new URLSearchParams(location.search);
var mod = params.get('ID');
var uni = params.get('University') ;
var name =  params.get('Name') ;

var app = new Vue({
  el: '#ratings',
  data: {
    Name: '',
    ID : '',
    University : '',
    TaughtAndStructured : 3,
    Workload : 3,
    Marking : 3,
    Difficulty : 3,
    FinalMark : 0,
    Overall : 5,
    Comments : ''
  }
})



if(mod != null && uni != null && name !=null){
    document.title = mod.toUpperCase() ; + " Rating";
    app.Name = name;
    app.ID = mod.toUpperCase() ;;
    app.University = uni;
}else{
  document.title = "Invalid Page"
  document.getElementById('form').style.display = 'none';
  document.getElementById('invalid').style.display = 'block';
}



function submitResults(){
  getUser(submitResultsAtUni)
}


function submitResultsAtUni(user){

if(user){



  firebase.database().ref(app.University + "/Ratings/" + app.ID + "/dd" + user.uid).set({


    taughtAndStructured :  Number(app.TaughtAndStructured),
    workload :  Number(app.Workload),
    marking :  Number(app.Marking),
    difficulty :  Number(app.Difficulty),
    finalMark : Number(app.FinalMark),
    overall : Number(app.Overall),
    comments : app.Comments

 
  }).then(function(){

    document.getElementById('form').style.display = 'none';
    document.getElementById('rated').style.display = 'block';

  }).catch(function(error) {
   


    var errorCode = error.code;
    var errorMessage = error.message;

    console.error(errorMessage);
    var errorBox = document.getElementById("errorBox");
    errorBox.style.display = "block";
    errorBox.innerHTML = '<pre class="warningBox warning--block">	<p style="color:white; align-content: center">' + errorMessage +'</p></pre>';
  });


}
else{
  document.getElementById('form').style.display = 'none';
  document.getElementById('notLogged').style.display = 'block';
}
}





  

