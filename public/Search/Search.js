let params = new URLSearchParams(location.search);
var uni = params.get('University') ;



var app = new Vue({
    el: '#Selected',
    data: {
        Uni : uni,
        Schools : [],
        selected : ''
    },
    methods: {
        search: function (event) {
            window.location='/Search/searchResults.html?University=' + app.Uni + '&School=' + app.selected; 
        }
      }
})


if(uni){
    document.getElementById('NotSelected').style.display ="none";
    document.getElementById('loading').style.display ="block";
    document.getElementById('uniLogo').src= "/Images/" + uni +".png";

    firebase.database().ref(app.Uni  + '/Schools').once('value').then(function(snapshot) {
        var data = snapshot.val().split(',');
        app.Schools = data;
        document.getElementById('loading').style.display ="none";
        document.getElementById('Selected').style.display ="block";
    });
}