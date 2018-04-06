var auth=app.fire.auth(), user = auth.currentUser;
if (user == null) {
  location.hash = "signin?now";
  return;
}
var ul = $('ul').addClass('user');
$(app.scContent).html(ul);
var userPhoto = $('img').addClass('profile').attr('alt',user.displayName);
if (user.photoURL){
  userPhoto.addClass('available').attr('src',user.photoURL);
}
ul.appendChild(
  $('li').appendChild(
    userPhoto
  ),
  $('li').appendChild(
    $('p').html(user.email?user.email:'No e-mail! why??? -> click to link with facebook').click(function(){
      // var provider = new firebase.auth.GoogleAuthProvider();
      // var provider = new firebase.auth.FacebookAuthProvider();
      // var provider = new firebase.auth.TwitterAuthProvider();
      // var provider = new firebase.auth.GithubAuthProvider();
      // user.linkWithPopup(provider).then(function(result) {
      //   var credential = result.credential;
      //   var user = result.user;
      //   console.log('done',result);
      // }).catch(function(error) {
      //   console.log('catch',error);
      // });
    }).addClass('userEmail')
  ),
  // $('li').appendChild(
  //   $('p').html(user.displayName)
  // ),
  $('li').appendChild(
    $('a').html('Signout').click(function(){
      auth.signOut().then(function() {
      }).catch(function(error) {
      });
    }).addClass('signOut')
  ),
  // $('li').appendChild(
  //   $('a').html('Testme').click(function(){
  //   }).addClass('Testme')
  // ),
  $('li').appendChild(
    $('a').html('E-mail verification').click(function(){
      if (!user.emailVerified) {
        user.sendEmailVerification().then(function() {
          $({
            message:'...verification has been sent!',
            ok:true,
            cancel:false
          }).notify();
        }).catch(function(error) {
          $({
            message:error.message,
            ok:true,
            cancel:false
          }).notify();
        });
      } else {
        $({
          message:'...already Verified!',
          ok:true,
          cancel:false
        }).notify();
      }
    }).toggleClass('emailVerified').toggleClass('active',user.emailVerified)
  ),
  $('li').appendChild(
    $('a').html('update E-mail').click(function(evt){
      var a = evt.target, li = a.parentNode;
      a.style.display='none';
      $(li).appendChild(
        $('div').appendChild(
          $('input').attr('type','text').attr('id','tmp').attr('placeholder','E-mail'),
          $('button').addClass('icon-show-tips').click(function(){
            var newEmail = $(li).selectElement('input#tmp').target.value;
            var resetContainer = function(){
              a.style.display='';
              li.lastChild.remove();
            };
            user.updateEmail(newEmail).then(function() {
              $({
                message:'Email has been updated!',
                ok:true,
                cancel:false
              }).notify().then(function(){
                resetContainer();
              });
            }).catch(function(error) {
              $({
                message:error.message,
                ok:true,
                cancel:true
              }).notify().then(function(){
                console.log('try again');
              },function(){
                resetContainer();
              });
            });
          }).attr('type','button')
        )
      );
    })
  ),
  $('li').appendChild(
    $('a').html('just Notify').click(function(){
      $({
        message:'Hello world',
        ok:'Just ok',
        cancel:false
      }).notify().then(function(){
        console.log('ok');
      },function(){
        console.log('cancel');
      });
    })
  ),
  $('li').appendChild(
    $('a').html('confirm Notify').click(function(){
      $({
        message:'Hello wild',
        ok:'Agree',
        cancel:'Not agree'
      }).notify().then(function(){
        console.log('ok');
      },function(){
        console.log('cancel');
      });
    })
  ),
  // $('li').appendChild(
  //   $('div').appendChild(
  //     $('input').attr('type','text').attr('name','tmp'),
  //     $('button').addClass('icon-show-tips').attr('type','button')
  //   )
  // ),
  $('li').appendChild(
    $('a').html('update Password').click(function(evt){
      var a = evt.target, li = a.parentNode;
      a.style.display='none';
      $(li).appendChild(
        $('div').appendChild(
          $('input').attr('type','text').attr('id','tmp').attr('placeholder','Password'),
          $('button').addClass('icon-show-tips').click(function(){
            var newPassword = $(li).selectElement('input#tmp').target.value;
            var resetContainer = function(){
              a.style.display='';
              li.lastChild.remove();
            };
            user.updatePassword(newPassword).then(function() {
              $({
                message:'Password has been Updated',
                ok:true,
                cancel:false
              }).notify().then(function(){
                resetContainer();
              });
            }).catch(function(error) {
              $({
                message:error.message,
                ok:true,
                cancel:true
              }).notify().then(function(){
                console.log('try again');
              },function(){
                resetContainer();
              });
            });
          }).attr('type','button')
        )
      );
    }).addClass('updatePassword')
  ),
  $('li').appendChild(
    $('a').html('update Name').click(function(evt){
      var a = evt.target, li = a.parentNode;
      a.style.display='none';
      $(li).appendChild(
        $('div').appendChild(
          $('input').attr('type','text').attr('id','tmp').attr('placeholder','Display Name'),
          $('button').addClass('icon-show-tips').click(function(){
            var newdisplayName = $(li).selectElement('input#tmp').target.value;
            var resetContainer = function(){
              a.style.display='';
              li.lastChild.remove();
            };
            user.updateProfile({displayName:newdisplayName}).then(function() {
              $({
                message:'Name has been updated!',
                ok:true,
                cancel:false
              }).notify().then(function(){
                resetContainer();
              });
            }).catch(function(error) {
              $({
                message:error.message,
                ok:true,
                cancel:true
              }).notify().then(function(){
                console.log('try again');
              },function(){
                resetContainer();
              });
            });
          }).attr('type','button')
        )
      );
    }).addClass('updateName')
  )
);
resolve();