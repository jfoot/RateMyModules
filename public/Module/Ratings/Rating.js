let params = new URLSearchParams(location.search);
var mod = params.get('ID');
var uni = params.get('University') ;
var name =  params.get('Name') ;
var school = params.get('School') ;

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
    Comments : '',
    School : ''
  }
})



if(mod != null && uni != null && name !=null && school != null){
    document.title = mod.toUpperCase() ; + " Rating";
    app.Name = name;
    app.ID = mod.toUpperCase();
    app.University = uni;
    app.School = school;

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
 
      document.getElementById('form').style.display = 'none';
      document.getElementById('loading').style.display = 'block';





       // Create a reference for a new rating, for use inside the transaction
        var ratingRef = firebase.firestore().collection(app.University).doc('Modules').collection(app.School).doc(app.ID);

        // In a transaction, add the new rating and update the aggregate totals
        return firebase.firestore().runTransaction(transaction => {
            return transaction.get(ratingRef).then(res => {
                if (!res.exists) {
                    throw "Module does not exist!";
                }


                //Yes, we're using client side validation, because we're trying to keep our costs as low as possible.
                //Please do not abuse this system, we can see whose changing what and will just suspend your account
                //if you alter the overall rating figure. 

                // Compute new number of ratings
                var currentNumberOfRatings = res.data().summaryRating.NumberOfRatings;
                var newNumberOfRatings = currentNumberOfRatings + 1;
              

                // Compute new average Overall rating
                var oldOverallRatingTotal = res.data().summaryRating.Overall * currentNumberOfRatings;
                var newOverallRating = (oldOverallRatingTotal + Number(app.Overall)) / newNumberOfRatings;


                // Compute new average TaughtAndStructured rating
                var oldTaughtAndStructuredRatingTotal = res.data().summaryRating.TaughtAndStructured * currentNumberOfRatings;
                var newTaughtAndStructuredRating = (oldTaughtAndStructuredRatingTotal + Number(app.TaughtAndStructured)) / newNumberOfRatings;

                // Compute new average WorkLoad rating
                var oldWorkLoadRatingTotal = res.data().summaryRating.Workload * currentNumberOfRatings;
                var newWorkLoadRating = (oldWorkLoadRatingTotal + Number(app.Workload)) / newNumberOfRatings;

                // Compute new average Difficulty rating
                var oldDifficultyRatingTotal = res.data().summaryRating.Difficulty * currentNumberOfRatings;
                var newDifficultyRating = (oldDifficultyRatingTotal + Number(app.Difficulty)) / newNumberOfRatings;

                // Compute new average FinalMark rating
                var oldFinalMarkRatingTotal = res.data().summaryRating.FinalMark * currentNumberOfRatings;
                var newFinalMarkRating = (oldFinalMarkRatingTotal + Number(app.FinalMark)) / newNumberOfRatings;

          
                // Commit to Firestore
                transaction.update(ratingRef,
                  'summaryRating', {
                    NumberOfRatings: newNumberOfRatings,
                    Overall: newOverallRating,
                    TaughtAndStructured : newTaughtAndStructuredRating,
                    Workload : newWorkLoadRating,
                    Difficulty : newDifficultyRating,
                    FinalMark : newFinalMarkRating,
                    lastEditor : user.uid
                });


                //Sets single users rating. This can be used to recover or fix anyone messing with the overall ratings.
                transaction.set(ratingRef.collection('Ratings').doc(user.uid), { 
                  taughtAndStructured :  Number(app.TaughtAndStructured),
                  workload :  Number(app.Workload),
                  marking :  Number(app.Marking),
                  difficulty :  Number(app.Difficulty),
                  finalMark : Number(app.FinalMark),
                  overall : Number(app.Overall),
                  comments : app.Comments
                 });


               document.getElementById('loading').style.display = 'none';
               document.getElementById('rated').style.display = 'block';
            })
        }).catch(function(error) {
          var errorCode = error.code;
            var errorMessage = error.message;
        
            console.error(errorMessage);
            var errorBox = document.getElementById("errorBox");
            errorBox.style.display = "block";
            errorBox.innerHTML = '<pre class="warningBox warning--block">	<p style="color:white; align-content: center">' + errorMessage +'</p></pre>';
        });;



}
else{
  document.getElementById('form').style.display = 'none';
  document.getElementById('notLogged').style.display = 'block';
}
}





  

