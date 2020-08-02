

var app = new Vue({
    el: '#form',
    data: {
      University: '',
      IDCode : '',
      Name : '',
      School : '',
      Description : '',
      Lecturer : '',
      Schools : [],
      selected : ''

    }
})

getUser(InitialPopulate)

function InitialPopulate(user){
    if(user){
        app.University =  getUni(user);

        firebase.database().ref(app.University  + '/Schools').once('value').then(function(snapshot) {
            var data = snapshot.val().split(',');
            app.Schools = data;
        });
    }
    else{
        document.getElementById('create').style.display = "none";
        document.getElementById('notLogged').style.display = "block";
    }
}



function createModule() {


    firebase.database().ref(app.University  + '/Modules/' + app.IDCode.toUpperCase()).once('value').then(function(snapshot) {
        var data = snapshot.val();
        if(data){
           
           var errorBox = document.getElementById("errorBox");
            errorBox.style.display = "block";
            errorBox.innerHTML = '<pre class="warningBox warning--block">	<p style="color:white; align-content: center">This module already exists. If you want to edit the module please view its page.</p></pre>';

        }else{
            firebase.database().ref(app.University + "/Modules/" + app.IDCode.toUpperCase()).set({
                description: app.Description,
                lecturer: app.Lecturer,
                simpleName :app.Name,
                school : app.selected
            }).then(function() {
                document.getElementById("errorBox").style.display = "none";
                document.getElementById("create").style.display = "none";
                document.getElementById('created').style.display = "block";
        
        
        
            }).catch(function(error) {
                console.log(error.message)
            
                    var errorCode = error.code;
                    var errorMessage = error.message;
            
                    console.error(errorMessage);
                    var errorBox = document.getElementById("errorBox");
                    errorBox.style.display = "block";
                    errorBox.innerHTML = '<pre class="warningBox warning--block">	<p style="color:white; align-content: center">' + errorMessage +'</p></pre>';

            });
        }
    });
}
  
  
