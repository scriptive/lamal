return new Promise(function(resolve, reject) {
  app.fire.auth().onAuthStateChanged(function(user) {
    var pageId = local.name.query.page;
    var pageAuth ='';
    if (configuration.page.hasOwnProperty(pageId)) {
      if (configuration.page[pageId].hasOwnProperty('auth')) {
        pageAuth=configuration.page[pageId].auth;
      }
    }
    if (user) {
      // NOTE: signed in
      user.getIdToken().then(function(accessToken) {
        if (pageAuth == 'guest') location.hash = "user?now";
      }).then(function(){
        resolve();
      });
    } else {
      // NOTE: signed out
      if (pageAuth == 'user') location.hash = "signin?now";
      reject();
    }
  },function(){
    // NOTE: error
    reject();
  });
});