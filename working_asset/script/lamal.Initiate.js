configuration.pageHome=Object.keys(configuration.page)[0];
var process = function() {
  // =require lamal.Initiate.process.js
};
var template = function(e) {
  // =require lamal.Initiate.template.js
};
var terminal = function() {
  // =require lamal.Initiate.terminal.js
};
var route = function() {
  // =require lamal.Initiate.route.js
};
var user = function() {
  // =require lamal.Initiate.user.js
};
// {"class":{"fontsize":"size-normal","background":"color-white"}}
// {"version":"1.0.0","build":"1.0.1","class":{"fontsize":"size-normal","background":"color-white"}}
// firebase.app();
// firebase.initializeApp({},'lamal');



// window.addEventListener('load', function() {
//
// });
// document.onreadystatechange = function(){
//   if (document.readyState === 'complete') {
//     console.log(firebase.auth().currentUser);
//   }
// };

// user().then(function(){
//   console.log('User is signed in');
// },function(){
//   console.log('No user is signed in');
// }).then(function(){
//   console.log('userFinal');
// });

new Promise(function(resolve, reject) {
  local.select('setting').select('book').select('query').select('language').select('randomverse').select('todo').select('bookmark').select('suggestion');
  user().then(function(){
    // NOTE: user signed in
  },function(){
    // NOTE: user signed out
  }).then(function(){
    // console.log('it stop here');
    var firestore=app.fire.firestore(), sourceCollection= firestore.collection("source");
    sourceCollection.get().then(function(raw) {
      raw.forEach(function(row){
        app.Data.source[row.id]=row.data();
        sourceCollection.doc(row.id).onSnapshot(function(row) {
          // var source = row.metadata.hasPendingWrites ? "Local" : "Server";
          app.Data.source[row.id]=row.data();
        });
      });
    }).then(function() {
      // console.log(app.Data.source);
      var kindCollection= firestore.collection("kind");
      kindCollection.get().then(function(raw) {
        raw.forEach(function(row){
          app.Data.kind[row.id]=row.data();
          kindCollection.doc(row.id).onSnapshot(function(row) {
            app.Data.kind[row.id]=row.data();
          });
        });
      }).then(function() {
        // console.log(app.Data.source);
        // console.log(app.Data.kind);
        var langCollection= firestore.collection("lang");
        langCollection.get().then(function(raw) {
          raw.forEach(function(row){
            app.Data.lang[row.id]=row.data();
            langCollection.doc(row.id).onSnapshot(function(row) {
              app.Data.lang[row.id]=row.data();
            });
          });
        }).then(function() {
          // console.log(app.Data.source);
          // console.log(app.Data.kind);
          // console.log(app.Data.lang);
          process().then(function(){
            doc.body.classList.add('lamal');
            if(local.name.setting.hasOwnProperty('class')){
              $(local.name.setting.class).each(function(v,i){
                doc.body.classList.add(v);
              });
            } else {
              local.name.setting.class={};
            }
            if(local.name.setting.hasOwnProperty('available')){
              // available
            } else {
              local.name.setting.available={};
            }
            return template();
          },function(e){
            return e;
          }).then(function(e) {
            if (e) {
              reject(e);
            } else {
              resolve();
            }
          });
        });
      });

    });
    // process().then(function(){
    //   doc.body.classList.add('lamal');
    //   if(local.name.setting.hasOwnProperty('class')){
    //     $(local.name.setting.class).each(function(v,i){
    //       doc.body.classList.add(v);
    //     });
    //   } else {
    //     local.name.setting.class={};
    //   }
    //   if(local.name.setting.hasOwnProperty('available')){
    //     // available
    //   } else {
    //     local.name.setting.available={};
    //   }
    //   return template();
    // },function(e){
    //   return e;
    // }).then(function(e) {
    //   if (e) {
    //     reject(e);
    //   } else {
    //     resolve();
    //   }
    // });
  });
}).then(function() {
  app.on('hash',function(e) {
    terminal().then(function(e) {
      // NOTE: if page error
      if (e)console.log('page error',e);
    });
  });
}, function(e) {
  new Promise(function(resolve, reject) {
    if (configuration.requireUpdate) {
      local.deleteAll();
      reject();
      // if (app.hashObject.hasOwnProperty('reset')) local.deleteAll(), reject();
    } else {
      resolve();
    }
  }).then(function(){
    if (typeof e === 'object' && e.hasOwnProperty('message')) {
      app.notification(e.message);
    } else if (typeof e === 'string') {
      app.notification(e);
    }
  },function(){
    // location.reload(true);
  });
});