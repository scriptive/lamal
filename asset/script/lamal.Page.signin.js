var auth=app.fire.auth(), user = auth.currentUser;
if (user != null) {
  location.hash = "user?now";
  return resolve();
}
var form = $('form').addClass('user').attr('method','POST').attr('name','signin')
$(app.scContent).html(form);
form.appendChild(
  $('div').appendChild(
    $('p').html('E-mail'),
    $('input').attr('value','').attr('type','text').attr('name','email')
  ),
  $('div').appendChild(
    $('p').html('Password'),
    $('input').attr('value','').attr('type','password').attr('name','password')
  ),
  $('div').appendChild(
    $('input').attr('value','Signin').attr('type','submit')
  ),
  $('div').appendChild(
    $('p').attr('id','messageContainer')
  ),
  $('div').appendChild(
    $('p').appendChild(
      $('a').html('Signin with google account').click(function(){
        var messageContainer = $().selectElement("#messageContainer");
        // console.log(messageContainer);
        var provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          messageContainer.html(errorMessage);
          console.log(error);
        });
      }).addClass('icon-gplus external')
    ),
    // TODO: https://support.google.com/firebase/answer/6400716
    $('p').appendChild(
      $('a').html('Signin with facebook account').click(function(){
        var messageContainer = $().selectElement("#messageContainer");
        var provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          messageContainer.html(errorMessage);
          console.log(error);
        });
      }).addClass('icon-facebook external')
    ),
    $('p').appendChild(
      $('a').addClass('external').html('Forgot password').attr('href','#fgpwd')
    ),
    $('p').appendChild(
      $('a').addClass('external').html('Signup').attr('href','#signup?now')
    )
  )
).submit(function(evt){
  evt.preventDefault();
  var data = evt.target.elements;
  var messageContainer = $(this).selectElement("#messageContainer");
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {
    return auth.signInWithEmailAndPassword(data.email.value, data.password.value).then(function(e) {
      location.hash = "login?success";
    }).catch(function(error) {
      if (error.message) {
        messageContainer.html(error.message);
      }
    });
  }).catch(function(error) {
    if (error.message) {
      messageContainer.html(error.message);
    }
  });
});

resolve();
// firebase.auth.Auth.Persistence.LOCAL
// firebase.auth.Auth.Persistence.SESSION
// firebase.auth.Auth.Persistence.NONE
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {
//   return firebase.auth().signInWithEmailAndPassword(email, password);
// }).catch(function(error) {
// });