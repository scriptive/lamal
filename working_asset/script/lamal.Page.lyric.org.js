var firestore = app.fire.firestore();

var ul = $('ul').addClass('lyric');
$(app.scContent).html(ul);

var objectLyric={};

// console.log(local.name.query.song);



// $('li').appendChild(
//   $('h1').html('title')
// ).appendTo(ul);
//
// return resolve();
// console.log('+');
// row.lyric.split('\n')[0]
$(configuration.lang.OneMoment).notify(function(res,rej){
  return firestore.collection("lyric").doc(local.name.query.song).get().then(function(raw) {
    // console.log(raw);
    var row = raw.data();
    // console.log(row);
    // viewLyric(row.lyric);


    $('li').appendChild(
      // $('h1').html(row.metaTitle),
      viewLyric(row.lyric)
    ).appendTo(ul);
    // $('li').appendChild(
    //   $('h1').html(row.metaTitle)
    // ).appendTo(ul);
    // $('li').appendChild(
    //   $('p').html(row.lyric)
    // ).appendTo(ul);
  }).catch(function(error) {
  }).then(function() {
    console.log(objectLyric);
    resolve();
  });
});
var viewLyric =function(rowLyric){

  var lyric = app.Lyric(rowLyric);
  console.log(lyric);

  var container = $('div').addClass('lamal');
  var Lyric = rowLyric.split(/\n\s/).filter(function(e){ return e === 0 || e });
  $(Lyric).each(function(v,k){
    var isChord, verseContainer, isClass, isChorus = v.match(/\{([^}]+)\}/);
    try {
      isChord = JSON.parse(v);
      objectLyric['chord']=isChord;
      verseContainer=$('div').addClass('chord').appendTo(container);
      for (var chord in isChord) {
        $('p').addClass('chordBase').html(chord).appendTo(verseContainer);
        if (isChord[chord]) {
          verseContainer=$('code').addClass('testing').appendTo(verseContainer);
          if (typeof isChord[chord] == 'string') {
            $('span').attr('data-chord',isChord[chord]).appendTo(verseContainer);
          } else {
            isChord[chord].map(function(k) {
              $('span').attr('data-chord',k).appendTo(verseContainer);
            });
          }
        }
      }
    } catch (e) {
      var verse = v.split(/\n/).filter(function(e){ return e === 0 || e });
      if (k == 0 && verse.length == 1){
        $('h1').html(verse[0]).appendTo(container);
        objectLyric['title']=verse[0];
        objectLyric['lyric']=[];
      } else {
        verse = (isChorus?isChorus[1]:v).split(/\n/).filter(function(e){ return e === 0 || e });
        verseContainer=$('div').addClass(isChorus?'chorus':'verse').appendTo(container);
        // objectLyric['context'][k]={};
        var contextBlock={
          isChorus:(isChorus?true:false),
          context:[]
        };
        for (var id in verse) {
          var verseLine = verse[id];
          contextBlock.context.push(verseLine);
          // objectLyric['context'][k][id]=verseLine;
          $('p').html(verseLine.replace(/\[(.*?)\]/g,'<span data-chord="$1"></span>')).appendTo(verseContainer);
        }
        objectLyric['lyric'].push(contextBlock);
      }
    } finally {

    }
  });
  return container;
};