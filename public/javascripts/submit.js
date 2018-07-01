var url = currentURL + "/api"; 
//http://localhost:3000/api
var usersAlready = [];
//GET USERS FROM JSON
var currentURL = window.location.origin;
// The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
$.ajax(
    { 
        url: url, 
        method: "GET" 
    })
.then(function(data){
          console.log(data);
          usersAlready = data;
    });

//user class
var User = function(name,url,answers){
    this.name = name;
    this.url = url;
    this.answers = answers;
};

//************************************************************
$( "button" ).click(function(e) {
    e.preventDefault();
//user's name
    var userName = $('#name').val();
//user's photo profile url
    var photoUrl = $('#url').val();
//user's answers 
    var answers = getUserAnswer();
    console.log('estas son las ans '+answers);
//instantiate User
    var newUser = new User(userName,photoUrl,answers);
//push the new user to the usersAlready array
    getMatch(newUser.answers,newUser);
//Clean form
    cleanForm();
});
//************************************************************
function getMatch(currentUserAnswers,currentUser){
    for (var i = 0; i< usersAlready.length; i++){
        var arrayOfDifferences = diffArray(usersAlready[i].answers, currentUserAnswers); 
        console.log(arrayOfDifferences);
        console.log(usersAlready[i].answers);
        console.log(currentUserAnswers);
        if (arrayOfDifferences.length === 0){
            console.log(usersAlready[i].url);
            swal({
                icon: usersAlready[i].url,
                imageHeight: 300,
                imageAlt: usersAlready[i].name
            })
        }
    }
    usersAlready.push(currentUser);

//  Post to json
    $.post("/api", currentUser)
        .then(function(data) {
          console.log('Im from client side'+data);
    });
    
}
//************************************************************
function cleanForm(){
    document.getElementById("newUser").reset(); 
}
//************************************************************
function diffArray(arr1, arr2) {
  var newArr = [];

  arr1.map(function(val) {
    arr2.indexOf(val) < 0 ? newArr.push(val) : '';
  });

  arr2.map(function(val) {
    arr1.indexOf(val) < 0 ? newArr.push(val) : '';
  });

  return newArr;
}
//************************************************************
function getUserAnswer(){
    var questions = $('select');
    var arrayAns = [];
    //iterate into all select elements
    for (var i = 0; i < questions.length; i++){
        arrayAns.push(parseInt(questions.eq(i).val()));    
    };
    return arrayAns
}





