// console.log(app.scMain);
// console.log(app.scMenu);
// console.log(app.scContent);
// console.log(app.scPanelCurrent);

var auth=app.fire.auth(), user = auth.currentUser;
var firestore = app.fire.firestore();

var ul = $('ul').addClass('home');
$(app.scContent).html(ul);

var bannerContext = function(){
  // var user={
  //   displayName:''
  // };
  // var messageCollection = ["Good!", "Great!", "Awesome!", "Super!", "Nice!","Hi dammaw?",configuration.name];
  var messageCollection = ["Good!", "Great!", "Awesome!", "Hi there!","Hi dammaw?",configuration.name];
  if (user){
    var messageActive= messageCollection[Math.floor(Math.random() * messageCollection.length)];
    if (user.displayName) {
      // $('span').addClass('logo').html('Hi dammaw?')
      return $('p').appendChild(
        $('span').addClass('logo').html(messageActive),
        $('a').html('Khen Solomon Lethil').attr('href','#user?')
      );
    } else {
      return $('p').appendChild(
        $('span').addClass('logo').html(messageActive),
        $('a').html('khensolomon@gmail.coms').attr('href','#user?'),
        $('span').addClass('other').html('...update profile?')
      );

    }
  } else {
    return $('p').appendChild(
      $('span').addClass('logo').html('Are you'),
      $('a').html('signing in...').attr('href','#signin?'),
      $('span').addClass('other').html('or'),
      $('a').html('...ready to signup?').attr('href','#signup?')
    );

  }
};


ul.appendChild(
  $('li').appendChild(
    $('div').appendChild(
      bannerContext()
    ).addClass('banner')
  )
  // $('li').appendChild(
  //   $('div').appendChild(
  //     $('a').html('ClickMe').click(function(){
  //       console.log('yes! it does nothing');
  //     })
  //   ).addClass('page')
  // )
);

$(configuration.page).each(function(v,i){
  if (v.name && v.hasOwnProperty('home')) {
    ul.appendChild(
      $('li').appendChild(
        $('div').appendChild(
          $('a').html(v.name).attr('href','#'+i)
        ).addClass('page',i).toggleClass('active',local.name.query.page==i)
      )
    );
  }
});

resolve();
