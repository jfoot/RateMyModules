let params = new URLSearchParams(location.search);
var mod = params.get('ID').toUpperCase() ;
var uni = params.get('University') ;

document.title = mod;
var app;
firebase.database().ref(uni  + '/Modules/' +mod  ).once('value').then(function(snapshot) {
    var data = snapshot.val();
    console.log(snapshot.val());

    app = new Vue({
        el: '#app',
        data: {
          Name: data.simpleName,
          ID : mod,
          School : data.school,
          Lecturer : data.lecturer,
          Description : data.description,
          University : uni
        }
    })
    

    document.getElementById('loader1').style.display = "none";
    document.getElementById('app').style.display = "block";

  });



function submitRating(){
  window.location.href = '/Module/Ratings/Rating.html?ID=' + app.ID +'&University=' + app.University + '&Name=' + app.Name;
}