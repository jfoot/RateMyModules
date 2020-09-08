
let params = new URLSearchParams(location.search);
var idCode = params.get('ID') ;

var app = new Vue({
    el: '#form',
    data: {
      University: '',
      IDCode : idCode,
      Name : '',
      School : '',
      Description : '',
      Lecturer : '',
      Schools : [],
      selected : '',
      Level : 1,
      Credits : 10,
      userID : '-1'
    }
})

getUser(InitialPopulate)

function InitialPopulate(user){
    if(user){
        app.University =  getUni(user);
        app.userID = user.uid;

        //We could cache this. 
        firebase.firestore().collection(app.University).doc('Schools').get().then((docSnapshot) => {
            app.Schools = docSnapshot.data().Schools;
        });
    }
    else{
        document.getElementById('create').style.display = "none";
        document.getElementById('notLogged').style.display = "block";
    }
}



function createModule() {
    var db = firebase.firestore();
    const moduleRef = db.collection(app.University).doc('Modules').collection(app.selected).doc(app.IDCode);

    moduleRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            var errorBox = document.getElementById("errorBox");
            errorBox.style.display = "block";
            errorBox.innerHTML = '<pre class="warningBox warning--block">	<p style="color:white; align-content: center">This module already exists. If you want to edit the module please view its page.</p></pre>';
        } else {
            moduleRef.set({
                description : app.Description,
                lecturer : app.Lecturer,
                simpleName : app.Name,
                credits : app.Credits,
                level : app.Level,
                lastEditor : app.userID,
                summaryRating :  {
                    NumberOfRatings: 0,
                    Overall: -1,
                    TaughtAndStructured : -1,
                    Workload : -1,
                    Difficulty : -1,
                    FinalMark : -1,
                    lastEditor : app.userID
                }
            }).then(function(docRef) {
                document.getElementById("errorBox").style.display = "none";
                document.getElementById("create").style.display = "none";
                document.getElementById('created').style.display = "block";
            })
            .catch(function(error) {
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
  
  
