let params = new URLSearchParams(location.search);
var uni = params.get('University') ;
var name =  params.get('School') ;

var app = new Vue({
    el: '#results',
    data: {
        Uni : uni,
        School : name,
        posts: [],
        Search : ''
    },
    computed: {
        activeUsers: function() {
          return this.posts.filter(function(u) {
            return u.id.toLowerCase().includes(app.Search.toLowerCase()) 
                || u.simpleName.toLowerCase().includes(app.Search.toLowerCase());
        })
      }
    } 
})

document.getElementById('uniLogo').src= "/Images/" + uni +".png";




Vue.component('blog-post', {
    props: ['post'],
    template: 
    ` <div class="card" @click="search">
            <h3 style="line-height: 0.8em;  margin: 0; padding: 5px;">{{ post.simpleName }} </h3>
            <p style="line-height: 0.8em;  margin: 0; padding: 7px;">{{ post.id }}</p>
      </div>`,
    methods: {
        search(e) {
            window.location='/Module/Module.html?University=' + app.Uni + '&ID=' +  this.post.id;  
        }
     }
})



firebase.database().ref(app.Uni  + '/Modules').once('value').then(function(snapshot) { 
    snapshot.forEach(doc => {
        let post = doc.val()
        post.id = doc.key;
        app.posts.push(post)
    })

    document.getElementById('loading').style.display = "none";
    document.getElementById('results').style.display = "block";
});







