let params = new URLSearchParams(location.search);
var uni = params.get('University') ;



var app = new Vue({
    el: '#Selected',
    data: {
        University : uni,
        Schools : [],
        selected : ''
    },
    methods: {
        search: function (event) {
            window.location='/Search/searchResults.html?University=' + app.University + '&School=' + app.selected; 
        }
      }
})


if(uni){
    document.getElementById('NotSelected').style.display ="none";
    document.getElementById('loading').style.display ="block";
    document.getElementById('uniLogo').src= "/Images/" + uni +".png";


    firebase.firestore().collection(app.University).doc('Schools').get().then((docSnapshot) => {
        app.Schools = docSnapshot.data().Schools;
        document.getElementById('Selected').style.display ="block";
        document.getElementById('loading').style.display ="none";
    });

}