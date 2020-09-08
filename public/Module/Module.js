let params = new URLSearchParams(location.search);
var mod = params.get('ID');
var uni = params.get('University');
var school = params.get('School');

document.title = mod;
var app;


if(mod == null || uni == null || school == null){
    document.getElementById('loader1').style.display = "none";
    document.getElementById('invalid').style.display = "block";
}
else{
    mod = mod.toUpperCase();
    firebase.firestore().collection(uni).doc('Modules').collection(school).doc(mod).get().then((docSnapshot) => {

        var data = docSnapshot.data();

        app = new Vue({
                el: '#app',
                data: {
                  Name: data.simpleName,
                  ID : mod,
                  School : school,
                  Lecturer : data.lecturer,
                  Description : data.description,
                  University : uni,
                  Credits : data.credits,
                  Level : data.level
                }
            })
            
        
            document.getElementById('loader1').style.display = "none";
            document.getElementById('app').style.display = "block";
    }).catch(function(error) {
      document.getElementById('loader1').style.display = "none";
      document.getElementById('invalid').style.display = "block";
  });
}


function submitRating(){
  window.location.href = '/Module/Ratings/Rating.html?ID=' + app.ID +'&University=' + app.University + '&Name=' + app.Name;
}