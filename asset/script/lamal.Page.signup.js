// console.log(app.scMain);
// console.log(app.scMenu);
// console.log(app.scContent);
// console.log(app.scPanelCurrent);
var form = $('form').addClass('user').attr('method','POST').attr('name','register')
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
    $('input').attr('value','Signup').attr('type','submit')
  ),
  $('div').appendChild(
    $('p').attr('id','messageContainer')
  ),
  $('div').appendChild(
    $('p').appendChild(
      $('a').addClass('external').html('Signin').attr('href','#signin?now')
    )
  )
).submit(function(evt){
  evt.preventDefault();
  var data = evt.target.elements;
  // task = evt.target.getAttribute("id");
  // console.log(data);
  // var email = data["email"].value;
  // var password = data["password"].value;
  // console.log(data.email.value,data.password.value);

  // if (task) app.form[task](data);
  // evt.preventDefault();
  // console.log('submit',this);
  // console.log(form);
  var messageContainer = $(this).selectElement("#messageContainer");

  firebase.auth().createUserWithEmailAndPassword(data.email.value, data.password.value).then(function(e){
    // console.log('done???',e);
    location.hash = "login";
  }).catch(function(error) {
    // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    console.log(error);
    if (error.message) {
      messageContainer.html(error.message);
    }
  });
});
resolve();