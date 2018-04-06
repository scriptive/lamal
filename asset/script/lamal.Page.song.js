var auth=app.fire.auth(), user = auth.currentUser;
var firestore = app.fire.firestore();

// console.log(local.name.query.category);
var ul = $('ul').addClass('song');
$(app.scContent).html(ul);


// var sourceTemplate = {
//   1:{
//     name:'Other',
//     unique:'srcOTH'
//   },
//   2:{
//     name:'ZBC',
//     unique:'srcZBC'
//   },
//   3:{
//     name:'Galhiam',
//     unique:'srcGLH'
//   }
// };

var idName='src123'.replace(/123/,app.Data.source[local.name.query.category].unique.toUpperCase());
// console.log(abc);
// .where("cat", "==", local.name.query.category)
// .where("cat", "==", true)
// .where("cat", "==", true)
firestore.collection("lyric").where(idName, ">", '').limit(20).get().then(function(raw) {
  raw.forEach(function(raw){
    var i=raw.data();
    var row = app.Lyric(i.metaLyric);
    // var lyricChord='';
    var lyricTmp = row.lyric[0].context.join(' ');
    // console.log(row);

    // if (lyricTmp.match(/\[(.*?)\]/g)) {}
    $('li').appendChild(
      $('div').appendChild(
        filterOption(raw.id,i),
        formatTitle(row,raw.id),
        // $('a').html(row.title).attr('href','#lyric?song='+raw.id).attr('data-chord',''),
        filterMeta(i),
        $('p').addClass('lyric').html(lyricTmp.replace(/\[(.*?)\]/g,''))
      ).attr('id',raw.id)
    ).appendTo(ul);
  });
}).catch(function(error) {
    console.log("Error getting documents: ", error);
}).then(function() {
  if (!ul.hasChild()) {
    ulEmpty(ul);
  }
  resolve();
});


var formatTitle=function(row,id){
  var a = $('a').html(row.title).attr('href','#lyric?song='+id);
  var chord = Object.keys(row.chord);
  if (chord.length){
    a.attr('data-chord',chord.join(','));
    if (row.lyric[0].hasChord){
      a.addClass('hasChord');
    }
  }
  return a;
};
var filterOption=function(id,o){
  var container = $('p').appendChild(
    $('span').addClass('userName').html(o.userName),
    $('span').addClass('userDate').html(o.userDate),
    $('span').addClass('userEdition').html(o.userEdition.toString())
    // $('span').addClass('userVote icon-emo-happy').html(o.userVote.toString())
  ).addClass('posts');

  if (user) {
    if (user.uid == o.userId || user.email =='khensolomon@gmail.com') {
      container.appendChild(
        $('span').addClass('edit').html('Edit').click(function(e){
          app.Data.editor[id]=o;
          window.location.hash = 'editor?song=123'.replace(/123/,id);
        }),
        $('span').addClass('delete').html('Delete').click(function(e){
          var div = e.target.parentNode.parentNode;
          // var id = div.getAttribute('id');
          firestore.collection("lyric").doc(id).delete().then(function() {
            var ul = $(div.parentNode.parentNode);
            div.parentNode.remove();
            if (!ul.hasChild()){
              ulEmpty(ul);
            }
          }).catch(function(error) {
              console.error("Error removing document: ", error);
          });
        })
      );
    }
  }
  return container;
};
var filterMeta=function(l){
  var container = $('p').addClass('meta');
  var o = {
    metaArtist:{
      className:'artist icon-artist'
    },
    metaWriter:{
      className:'writer icon-writer'
    },
    metaAlbum:{
      className:'album icon-cd'
    },
    metaYear:{
      className:'year icon-year'
    }
  };
  for (var i in o) {
    if (o.hasOwnProperty(i) && l.hasOwnProperty(i) && l[i] ) {
      $('span').html(l[i]).addClass(o[i].className).appendTo(container);
    }
  }
  if (container.hasChild()) {
    return container;
  }
  // $('p').appendChild(
  //   $('span').addClass('artist icon-artist icon-user').html(i.metaArtist),
  //   $('span').addClass('writer icon-writer icon-user').html(i.metaWriter),
  //   $('span').addClass('album icon-album icon-user').html(i.metaAlbum),
  //   $('span').addClass('year icon-year icon-user').html(i.metaYear)
  // ).addClass('meta'),
};

var ulEmpty=function(ul){
  ul.appendChild(
    $('li').appendChild(
      $('div').appendChild(
        $('p').addClass('icon-info').html('NULL')
      )
    )
  ).attr('class','empty');
};
/*
{
  title:random,
  artist:'s',
  year:2015,
  writer:'name'
  lyric: "Turing",
  chord: true,
  key: 'E',
  cat: 3,
  lang: 2,
  userid:'fe345236'
}
*/
// var raw=[
//   {
//     id:'1',
//     chord: true,
//     key: 'E',
//     cat: 1,
//     lang: 2,
//
//     lyric: "a formal indication of\n a choice between two or more candidates\n or courses of action, expressed typically\n through a ballot or a show of hands.",
//
//     metaTitle:'random',
//     metaArtist:'test',
//     metaWriter:'test',
//     metaAlbum:'test',
//     metaYear:'2004',
//
//     userId:'fe345236',
//
//     postUser:'Khen Solomon Lethil',
//     postDate:'8 july',
//     postEdition:'1',
//     postVote:'1'
//   },
//   {
//     id:'2',
//
//     chord: true,
//     key: 'E',
//     cat: 1,
//     lang: 2,
//
//     lyric: "a formal indication of\n a choice between two or more candidates\n or courses of action, expressed typically\n through a ballot or a show of hands.",
//
//     metaTitle:'random',
//     metaArtist:'test',
//     metaWriter:'test',
//     metaAlbum:'test',
//     metaYear:'2004',
//
//     userId:'fe345236',
//
//     postUser:'Khen Solomon Lethil',
//     postDate:'8 july',
//     postEdition:'1',
//     postVote:'1'
//   },
//   {
//     id:'3',
//
//     chord: true,
//     key: 'E',
//     cat: '1',
//     lang: '2',
//
//     lyric: "a formal indication of\n a choice between two or more candidates\n or courses of action, expressed typically\n through a ballot or a show of hands.",
//
//     metaTitle:'random',
//     metaArtist:'test',
//     metaWriter:'test',
//     metaAlbum:'test',
//     metaYear:'2004',
//
//     userId:'fe345236',
//
//     postUser:'Khen Solomon Lethil',
//     postDate:'8 july',
//     postEdition:'1',
//     postVote:'1'
//   }
// ];
//
//
// raw.forEach(function(row){
//   $('li').appendChild(
//     $('div').appendChild(
//       $('p').appendChild(
//         $('span').addClass('postUser').html(row.postUser),
//         $('span').addClass('postDate').html(row.postDate),
//         $('span').addClass('postEdition').html(row.postEdition),
//         $('span').addClass('postVote icon-emo-happy').html(row.postVote)
//       ).addClass('posts'),
//       $('a').html(row.metaTitle).attr('href','#lyric?song='+row.id),
//       $('p').appendChild(
//         $('span').addClass('artist icon-artist icon-user').html(row.metaArtist),
//         $('span').addClass('writer icon-writer icon-user').html(row.metaWriter),
//         $('span').addClass('album icon-album icon-user').html(row.metaAlbum),
//         $('span').addClass('year icon-year icon-user').html(row.metaYear)
//       ).addClass('id3'),
//       $('p').addClass('lyric').html(row.lyric)
//     )
//   ).appendTo(ul);
// });
// resolve();