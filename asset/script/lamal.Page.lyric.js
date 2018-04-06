var firestore = app.fire.firestore();

var ul = $('ul').addClass('lyric');
$(app.scContent).html(ul);

$(configuration.lang.OneMoment).notify(function(res,rej){
  return firestore.collection("lyric").doc(local.name.query.song).get().then(function(raw) {
    var row = raw.data();
    $('li').appendChild(
      viewLyric(row.metaLyric)
    ).appendTo(ul);
  }).catch(function(error) {
  }).then(function() {
    resolve();
  });
});
// {"A":""}
// "A","Gbm","D","E","A","Gbm","D","E"
var viewLyric =function(raw){
  var container = $('div').addClass('lamal');
  var row = app.Lyric(raw);
  configuration.page[local.name.query.page].title=row.title;
  $('h1').html(row.title).appendTo(container);
  var isChord = row.chord;
  var verseContainer=$('div').addClass('chord').appendTo(container);
  for (var chord in isChord) {
    $('p').addClass('chordBase').html(chord).appendTo(verseContainer);
    if (isChord[chord]) {
      verseContainer=$('div').addClass('testing').appendTo(verseContainer);
      if (typeof isChord[chord] == 'string') {
        $('span').attr('data-chord',isChord[chord]).html(isChord[chord]).appendTo(verseContainer);
      } else {
        isChord[chord].map(function(k) {
          $('span').attr('data-chord',k).html(k).appendTo(verseContainer);
        });
      }
    }
  }
  // $(row.chord).each(function(v,k){});
  $(row.lyric).each(function(v,k){
    var verseContainer=$('div').addClass(v.isChorus?'chorus':'verse').appendTo(container);
    for (var i in v.context) {
      $('p').html(v.context[i].replace(/\[(.*?)\]/g,'<span data-chord="$1"></span>')).appendTo(verseContainer);
    }
  });
  return container;
};