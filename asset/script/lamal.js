/*!
    Lamal: https://scriptive.github.io/lamal
*/
(function($) {
  'use strict';
  var configPanel={
    // main:'#lCm',
    // mainActive:'.scSB',
    // menu:'#lMn',
    // // open:'right'
  },
  configMain={
    main:'#lCm',
    mainActive:'.scSB',
    menu:'#lMn',
    // open:'right',
    // open:'left',
    idUnique:'lamal:unique'
  },
  configuration={
    // =require lamal.Configuration.js
  };
  $('error').on(function(e){
    console.log('error',e);
  });
  $('notification').on(function(e){
    console.log(e);
    $('#msg').addClass('ready').html('...ready...');
  });
  $('notify').on(function(callback){
    var i=this.target;
    return new Promise(function(resolve, reject) {
      $().selectElement('.scNotify').addClass('active');
      if (typeof(i) =='string') {
        $().selectElement('.scNotify .msg').html(i);
        if (typeof(callback) =='function')callback(resolve, reject).then(function(){
          $().selectElement('.scNotify').removeClass('active');
        });
      } else {
        $().selectElement('.scNotify .msg').html(i.message);
        var actionOk = $().selectElement('.scNotify .action .ok').toggleClass('active',i.ok);
        if (actionOk.hasClass('active')){
          actionOk.html(typeof(i.ok) == 'string'?i.ok:'').click(function(){
            $().selectElement('.scNotify').removeClass('active');
            resolve();
          });
        }
        var actionCancel = $().selectElement('.scNotify .action .cancel').toggleClass('active',i.cancel);
        if (actionCancel.hasClass('active')){
          actionCancel.html(typeof(i.cancel) =='string'?i.cancel:'').click(function(){
            $().selectElement('.scNotify').removeClass('active');
            reject();
          });
        }
        if (typeof(callback) =='function')callback();
      }
    });
  });
  $(configMain).ready(function(app){
    // TODO: load user configuration, setup template, initiate UI
    var file, doc=document,local = app.localStorage;
    // $('what').notify();
    // firebase.app();
    if (!firebase.apps.length) {
      firebase.initializeApp(configuration.firebase);
    }
    // app.notify().then(function(){},function(){});
    app.extension({
      fire:firebase,
      initiate:function(){
        // =require lamal.Initiate.js
        // require lamal.Firebase.js
        // require lamal.Installation.js
      },
      Data:{
        editor:{},
        source:{},
        kind:{},
        lang:{}
      },
      Content:function(bId){
        // require lamal.Content.js
      },
      Lyric:function(raw){
        // =require lamal.Lyric.js
      },
      Notifyss:function(){
      },
      book:{
        // require lamal.Book.js
      },
      // require lamal.Common.js
      page:{
        home:function(resolve, reject){
          // =require lamal.Page.home.js
        },
        category:function(resolve, reject){
          // =require lamal.Page.category.js
        },
        song:function(resolve, reject){
          // =require lamal.Page.song.js
        },
        lyric:function(resolve, reject){
          // =require lamal.Page.lyric.js
        },
        editor:function(resolve, reject){
          // =require lamal.Page.editor.js
        },
        search:function(resolve, reject){
          // require lamal.Page.search.js
        },
        result:function(resolve, reject){
          // require lamal.Page.result.js
        },
        user:function(resolve, reject){
          // =require lamal.Page.user.js
        },
        signin:function(resolve, reject){
          // =require lamal.Page.signin.js
        },
        signout:function(resolve, reject){
          // require lamal.Page.signout.js
        },
        signup:function(resolve, reject){
          // =require lamal.Page.signup.js
        },
        fgpwd:function(resolve, reject){
          // =require lamal.Page.fgpwd.js
        },
        setting:function(resolve, reject){
          // require lamal.Page.setting.js
        },
        about:function(resolve, reject){
          // require lamal.Page.about.js
        },
        contact:function(resolve, reject){
          // require lamal.Page.contact.js
        }
      },
      header:{
        content:function(){
          var lMn = doc.getElementById('lMn');

          var buttonElement = $().selectElement('#lmH');
          // console.log(buttonElement);
          // var buttonElement = lMn.querySelector('#lmH');
          // var titleElement = lMn.querySelector('#lmD');
          // var homeElement= lMn.querySelector('.icon-panel')
          // var backElement = lMn.querySelector('#backLink');
          // titleElement.innerHTML = configuration.page[local.name.query.page].title;
          // titleElement.setAttribute('data-title',configuration.page[local.name.query.page].title);
          // console.log(local.name.query.page, local.name.query.pagePrevious);
          // var nameElement = configuration.page[local.name.query.page].title || '';
          // console.log(local.name.query.page,local.name.query.pagePrevious);
          if (local.name.query.page != local.name.query.pagePrevious){

            // $('.icon-panel').attr('class','icon-info').attr('data-id','changed');
            // $('.icon-info').attr('class','icon-panel').attr('data-id','lPl');
            //
            buttonElement.attr('class','icon-left').attr('data-id','').click(function(evt){
              evt.preventDefault();
              // window.location.hash = '#123?back'.replace(/123/,local.name.query.pagePrevious);
              window.location.hash = '123?back'.replace(/123/,local.name.query.pagePrevious);
            });

            // if (!backElement) {
            //   backElement= doc.createElement('li');
            //   backElement.setAttribute('class','icon-left');
            //   backElement.setAttribute('id','backLink');
            //   // test.parentNode.appendChild(back);
            //   lMn.insertBefore(backElement, lMn.firstChild);
            //
            //   homeElement.style.display='none';
            //   $(backElement).click(function(){
            //     // console.log('abc');
            //     window.location.hash = '#123'.replace(/123/,local.name.query.pagePrevious);
            //   });
            // }
          } else if (buttonElement){
            buttonElement.attr('data-id','lPl').attr('class','icon-panel');
            // backElement.remove();
            // homeElement.style.display='';
          }
        }
      }
    }).initiate();
  });
}(scriptive));