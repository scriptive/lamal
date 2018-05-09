// Initialize Firebase
var config = {
  apiKey: "AIzaSyBzD9QDpejlmn1X8PMxoeDvZnXccETqH1I",
  authDomain: "basic-zomi.firebaseapp.com",
  databaseURL: "https://basic-zomi.firebaseio.com",
  projectId: "basic-zomi",
  storageBucket: "basic-zomi.appspot.com",
  messagingSenderId: "772916234412",
  name:'EBA'
};
// firebase.initializeApp(config);

// Initialize the default app
var defaultApp = firebase.initializeApp(config);

console.log(defaultApp.name);  // "[DEFAULT]"

// You can retrieve services via the defaultApp variable...
var defaultStorage = defaultApp.storage();
var defaultDatabase = defaultApp.database();

// ... or you can use the equivalent shorthand notation
// defaultStorage = firebase.storage();
// defaultDatabase = firebase.database();
// console.log(defaultDatabase);
// var userId = firebase.auth().currentUser.uid;
// console.log(userId);

firebase.database().ref('language/').once('value').then(function(snapshot) {
  // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  // console.log(snapshot.val());
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    console.log(childKey,childData);
    // ...
  });
});
// var newPostKey = firebase.database().ref().child('posts').push().key;
// console.log(newPostKey);
// return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
// });