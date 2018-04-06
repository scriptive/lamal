var auth=app.fire.auth(), user = auth.currentUser;
var firestore = app.fire.firestore();
// console.log(local.name.query.language);
var lyricTemplate = {
  kind: 1,
  // kind: local.name.query.category,
  lang: local.name.query.language,

  metaTitle:'',
  metaLyric:'',

  metaArtist:'',
  metaWriter:'',
  metaAlbum:'',
  metaYear:'',

  // metaKND:'OTH,HYN,PNW',
  // metaSRC:'OTH,ZBC,GLH',
  // unique

  // kindHYN:'',
  // kindPNW:'',

  srcOTH:'1',
  srcZBC:'',
  srcGLH:'',

  userId:user.uid,
  userName:user.displayName,
  userDate:new Date(),
  userEdition:0,
  userVote:0
};

var songId ='';
if (app.hashObject.hasOwnProperty('song')) {
  songId = app.hashObject.song;
  if (app.Data.editor.hasOwnProperty(songId)){
    $(lyricTemplate).merge(app.Data.editor[songId]);
  } else {
    songId ='';
    var dataSource=app.Data.source;
    for (var id in dataSource) {
      if (dataSource.hasOwnProperty(id)) {
        var idName='src123'.replace(/123/,dataSource[id].unique.toUpperCase());
        if (id == local.name.query.category) {
          lyricTemplate[idName]=local.name.query.category
        } else {
          lyricTemplate[idName]='';
        }
      }
    }
  }
} else {
  var dataSource=app.Data.source;
  for (var id in dataSource) {
    if (dataSource.hasOwnProperty(id)) {
      var idName='src123'.replace(/123/,dataSource[id].unique.toUpperCase());
      if (id == local.name.query.category) {
        lyricTemplate[idName]=local.name.query.category
      } else {
        lyricTemplate[idName]='';
      }
    }
  }
}

var kindInput=function(){
  var data=app.Data.kind;
  var div = $('div').addClass('choose');
  for (var id in data) {
    if (data.hasOwnProperty(id)) {
      var o = data[id];
      var idName='kind123'.replace(/123/,o.name.replace(/\W/g, ''));
      var inputRadio = $('input').attr('type','radio').attr('name','kind').attr('id',idName).attr('value',id)
      if (id == lyricTemplate.kind){
        inputRadio.attr('checked','checked')
      }
      $('p').appendChild(
        $('label').html(o.name).attr('for',idName), inputRadio
      ).appendTo(div);
    }
  }
  return div;
};

var langInput=function(){
  var data=app.Data.lang;
  var div = $('div').addClass('choose');
  for (var id in data) {
    if (data.hasOwnProperty(id)) {
      var o = data[id];
      var idName='lang123'.replace(/123/,o.name.replace(/\W/g, ''));
      var inputRadio = $('input').attr('type','radio').attr('name','lang').attr('id',idName).attr('value',id)
      if (id == lyricTemplate.lang){
        inputRadio.attr('checked','checked')
      }
      $('p').appendChild(
        $('label').html(o.name).attr('for',idName), inputRadio
      ).appendTo(div);
    }
  }
  return div;
};

var sourceInput=function(){
  var data=app.Data.source;
  var div = $('div').addClass('provide');
  for (var id in data) {
    if (data.hasOwnProperty(id)) {
      var o = data[id];
      var idName='src123'.replace(/123/,o.unique.toUpperCase());
      $('p').appendChild(
        $('span').html(o.name),
        $('input').attr('type','text').attr('value',lyricTemplate[idName]).attr('name',idName)
      ).appendTo(div);
    }
  }
  return div;
};

var form = $('form').addClass('editor').attr('method','POST').attr('name','editor')
$(app.scContent).html(form);
form.appendChild(
  $('div').appendChild(
    $('textarea').attr('name','lyric').html(lyricTemplate.metaLyric)
  ).addClass('lyric'),
  $('div').appendChild(
    $('p').appendChild(
      $('span').html('Meta').click(function(e){
        var p = e.target, div = p.parentNode.parentNode;
        $(p).toggleClass('active');
        $(div).selectElement('.provide').toggleClass('active');
      })
    ),
    $('div').appendChild(
      $('p').appendChild(
        $('span').html('Artist'),
        $('input').attr('type','text').attr('value',lyricTemplate.metaArtist).attr('name','metaArtist')
      ),
      $('p').appendChild(
        $('span').html('Writer'),
        $('input').attr('type','text').attr('value',lyricTemplate.metaWriter).attr('name','metaWriter')
      ),
      $('p').appendChild(
        $('span').html('Album'),
        $('input').attr('type','text').attr('value',lyricTemplate.metaAlbum).attr('name','metaAlbum')
      ),
      $('p').appendChild(
        $('span').html('Year'),
        $('input').attr('type','text').attr('value',lyricTemplate.metaYear).attr('name','metaYear')
      )
    ).addClass('provide')
  ).addClass('info'),
  $('div').appendChild(
    $('p').appendChild(
      $('span').html('Kind').click(function(e){
        var p = e.target, div = p.parentNode.parentNode;
        $(p).toggleClass('active');
        $(div).selectElement('.choose').toggleClass('active');
      })
    ),
    kindInput()
  ).addClass('info'),
  $('div').appendChild(
    $('p').appendChild(
      $('span').html('Language').click(function(e){
        var p = e.target, div = p.parentNode.parentNode;
        $(p).toggleClass('active');
        $(div).selectElement('.choose').toggleClass('active');
      })
    ),
    langInput()
  ).addClass('info'),
  $('div').appendChild(
    $('p').appendChild(
      $('span').html('Source').click(function(e){
        var p = e.target, div = p.parentNode.parentNode;
        $(p).toggleClass('active');
        $(div).selectElement('.provide').toggleClass('active');
      })
    ),
    sourceInput()
  ).addClass('info'),
  $('div').appendChild(
    $('input').attr('value','Post').attr('type','submit')
  ),
  $('div').appendChild(
    $('p').attr('id','messageContainer')
  )
).submit(function(evt){
  evt.preventDefault();
  var data = evt.target.elements;
  // console.log(data);
  var messageContainer = $(this).selectElement("#messageContainer");

  var textarea = evt.target.previousSibling;
  var rawlyric = data.lyric.value;

  var metaTitle = rawlyric.split('\n')[0];
  var metaLyric = rawlyric;
  if (metaTitle == metaLyric) {
    return messageContainer.html('Please provide your lyric!');
  }
  messageContainer.html(
    $('span').addClass('animate-spin icon-loading')
  );

  var dataSource=app.Data.source;
  lyricTemplate.userEdition++;
  // lyricTemplate.userVote++;
  for (var id in dataSource) {
    if (dataSource.hasOwnProperty(id)) {
      var idName='src123'.replace(/123/, dataSource[id].unique.toUpperCase());
      lyricTemplate[idName]=data[idName].value;
    }
  }


  $(lyricTemplate).merge({
    // chord: '',
    // key: 'E',
    kind: data.kind.value,
    lang: data.lang.value,

    metaTitle:metaTitle,
    metaLyric: metaLyric,

    metaArtist:data.metaArtist.value,
    metaWriter:data.metaWriter.value,
    metaAlbum:data.metaAlbum.value,
    metaYear:data.metaYear.value,

    // userId:userId,
    // userName:userName,
    // userDate:new Date(),
    // userEdition:1,
    // userVote:1

  });
  // console.log(lyricTemplate);

  // var random = new Date().getTime(), userId='',userName='Guest';
  // if (typeof(user) =='object' && user) {
  //   userId = user.uid;
  //   if (user.displayName) {
  //     userName = user.displayName;
  //   } else {
  //     userName = 'No name';
  //   }
  // }
  if (songId){
    firestore.collection("lyric").doc(songId).set(lyricTemplate).then(function() {
      messageContainer.html('Done');
    }).catch(function(error) {
      messageContainer.html(error.message);
    });
  } else {
    firestore.collection("lyric").add(lyricTemplate).then(function(doc) {
      songId=doc.id;
      messageContainer.html('Posted');
    }).catch(function(error) {
      messageContainer.html(error.message);
    });
  }

});




resolve();