let params = new URLSearchParams(location.search);
var uni = params.get('University') ;
var name =  params.get('School') ;

var app = new Vue({
    el: '#results',
    data: {
        Uni : uni,
        School : name,
        posts: [],
        Filter : '',
        Search : ''
    },
    computed: {
        activeUsers: function() {
          return this.posts.filter(function(u) {

            var e = document.getElementById('year');
            var selected = e.options[e.selectedIndex].value;
            if(selected == "All"){
              return u.id.toLowerCase().includes(app.Filter.toLowerCase()) 
              || u.simpleName.toLowerCase().includes(app.Filter.toLowerCase());
            }
            else{
              return (u.id.toLowerCase().includes(app.Filter.toLowerCase()) 
              || u.simpleName.toLowerCase().includes(app.Filter.toLowerCase())) && u.level == selected;
            }
        })
    }
  } 
});

document.getElementById('uniLogo').src= "/Images/" + uni +".png";

console.log(document.getElementById('year').selectedIndex);


Vue.component('blog-post', {
    props: ['post'],
    template: 
    ` <div class="card" @click="search">
            <h3 style="line-height: 0.8em;  margin: 0; padding: 5px; float:left">{{ post.simpleName }} </h3>
            <h2 style="float:right; line-height: 0.8em;  margin: 0; padding: 5px;">{{ post.summaryRating.Overall }}</h2>
            <p style="line-height: 0.8em;  margin: 0; padding: 30px 5px 5px 0px">{{ post.id }}</p>
      </div>`,
    methods: {
        search(e) {
            window.location='/Module/Module.html?University=' + app.Uni + '&ID=' +  this.post.id + '&School=' + app.School;  
        }
     }
})



var lastVisible;

var first = firebase.firestore().collection(app.Uni).doc('Modules').collection(app.School).limit(3);

    first.get().then(function (documentSnapshots) {
      documentSnapshots.docs.forEach(doc => {
        let post = doc.data()
        post.id = doc.id;
        app.posts.push(post)
      });


    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];

    document.getElementById('loading').style.display = "none";
    document.getElementById('results').style.display = "block";
});


function LoadMore(){

  firebase.firestore().collection(app.Uni).doc('Modules').collection(app.School).startAfter(lastVisible).limit(10).get().then(function (documentSnapshots) {
    
  
    if(documentSnapshots.docs.length ==  0){
      document.getElementById('LoadMore').style.display = "none";
   }

    documentSnapshots.docs.forEach(doc => {
      let post = doc.data()
      post.id = doc.id;
      app.posts.push(post)
    });

    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
});
}




function Search(){
  if(app.Search != '' || app.search != null){
    firebase.firestore().collection(app.Uni).doc('Modules').collection(app.School).doc(app.Search).get().then(function (documentSnapshots) {
      if(documentSnapshots.exists){
        window.location='/Module/Module.html?University=' + app.Uni + '&ID=' +  app.Search + '&School=' + app.School;  
      }else{
        var errorBox = document.getElementById("errorBox");
        errorBox.style.display = "block";
        errorBox.innerHTML = '<pre class="warningBox warning--block" style="margin-top: 1cm;">	<p style="color:white; align-content: center">' + app.Search.toUpperCase() + " Does not yet exist, if you believe it should you can <a href='/Module/createModule.html?ID="  + app.Search.toUpperCase() + "'>create a new module here.</a>" +'</p></pre>';      
      }
    });
}
}


function ReFilter(){



  var e = document.getElementById('year');
  var selected = e.options[e.selectedIndex].value;


  if(selected == "All"){
    firebase.firestore().collection(app.Uni).doc('Modules').collection(app.School).startAfter(lastVisible).limit(10).get().then(function (documentSnapshots) {
    
  
      if(documentSnapshots.docs.length ==  0){
        document.getElementById('LoadMore').style.display = "none";
     }
  
      documentSnapshots.docs.forEach(doc => {
        let post = doc.data()
        post.id = doc.id;
        app.posts.push(post)
      });
  
      lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  });
  }else{
    //.orderBy("summaryRating.Overall", "desc")
    firebase.firestore().collection(app.Uni).doc('Modules').collection(app.School).where("level", "==", selected).startAfter(lastVisible).limit(10).get().then(function (documentSnapshots) {
    
  
      if(documentSnapshots.docs.length ==  0){
        document.getElementById('LoadMore').style.display = "none";
     }
  
      documentSnapshots.docs.forEach(doc => {
        let post = doc.data()
        post.id = doc.id;
        app.posts.push(post)
      });
  
      lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
  });
  }

 

  app.Filter = app.Filter + " ";
  app.Filter = app.Filter.slice(0, -1);
  document.getElementById('LoadMore').style.display = "block";



}