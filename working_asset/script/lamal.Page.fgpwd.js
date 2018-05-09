if (firebase.auth().currentUser  != null) {
  location.hash = "user?now";
  return resolve();
}
var form = $('form').addClass('user').attr('method','POST').attr('name','fgpwd')
$(app.scContent).html(form);
form.appendChild(
  $('div').appendChild(
    $('p').html('E-mail'),
    $('input').attr('value','').attr('type','text').attr('name','email')
  ),
  $('div').appendChild(
    $('input').attr('value','Reset Password').attr('type','submit')
  ),
  $('div').appendChild(
    $('p').attr('id','messageContainer')
  ),
  $('div').appendChild(
    $('p').appendChild(
      $('a').addClass('external').html('Signin').attr('href','#signin?now'),
      $('span').html(' .... '),
      $('a').addClass('external').html('Signup').attr('href','#signup?now')
    )
  )
).submit(function(evt){
  evt.preventDefault();
  var data = evt.target.elements;
  var messageContainer = $(this).selectElement("#messageContainer");
  firebase.auth().sendPasswordResetEmail(data.email.value).then(function(e) {
    // Email sent.
    console.log(e);
  }).catch(function(error) {
    if (error.message) {
      messageContainer.html(error.message);
    }
  });
});

//
// var user = firebase.auth().currentUser;
//
// if (user != null) {
//   user.providerData.forEach(function (profile) {
//     console.log("Sign-in provider: " + profile.providerId);
//     console.log("  Provider-specific UID: " + profile.uid);
//     console.log("  Name: " + profile.displayName);
//     console.log("  Email: " + profile.email);
//     console.log("  Photo URL: " + profile.photoURL);
//   });
// }
resolve();