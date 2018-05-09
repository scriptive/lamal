var rawObject={
  title:'',chord:{}, lyric:[]
};
var rawBlock = raw.split(/\n\s/).filter(function(e){ return e === 0 || e });
$(rawBlock).each(function(v,k){
  var isChorus = v.match(/\{([^}]+)\}/);
  try {
    rawObject.chord = JSON.parse(v);
  } catch (e) {
    var verse = v.split(/\n/).filter(function(e){ return e === 0 || e });
    if (k == 0 && verse.length == 1){
      rawObject.title=verse[0];
    } else {
      verse = (isChorus?isChorus[1]:v).split(/\n/).filter(function(e){ return e === 0 || e });

      var rawContext={
        isChorus:(isChorus?true:false), hasChord:'', context:[]
      };
      rawContext.context=verse;
      rawContext.hasChord=verse.join(' ').match(/\[(.*?)\]/g);
      // for (var id in verse) { rawContext.context.push(verse[id]);}
      rawObject.lyric.push(rawContext);
    }
  } finally {

  }
});

return rawObject;

// var viewLyric =function(rowLyric){
//   var container = $('div').addClass('lamal');
//   var Lyric = rowLyric.split(/\n\s/).filter(function(e){ return e === 0 || e });
//   $(Lyric).each(function(v,k){
//     var isChord, verseContainer, isClass, isChorus = v.match(/\{([^}]+)\}/);
//     try {
//       isChord = JSON.parse(v);
//       objectLyric['chord']=isChord;
//       verseContainer=$('div').addClass('chord').appendTo(container);
//       for (var chord in isChord) {
//         $('p').addClass('chordBase').html(chord).appendTo(verseContainer);
//         if (isChord[chord]) {
//           verseContainer=$('code').addClass('testing').appendTo(verseContainer);
//           if (typeof isChord[chord] == 'string') {
//             $('span').attr('data-chord',isChord[chord]).appendTo(verseContainer);
//           } else {
//             isChord[chord].map(function(k) {
//               $('span').attr('data-chord',k).appendTo(verseContainer);
//             });
//           }
//         }
//       }
//     } catch (e) {
//       var verse = v.split(/\n/).filter(function(e){ return e === 0 || e });
//       if (k == 0 && verse.length == 1){
//         $('h1').html(verse[0]).appendTo(container);
//         objectLyric['title']=verse[0];
//         objectLyric['lyric']=[];
//       } else {
//         verse = (isChorus?isChorus[1]:v).split(/\n/).filter(function(e){ return e === 0 || e });
//         verseContainer=$('div').addClass(isChorus?'chorus':'verse').appendTo(container);
//         // objectLyric['context'][k]={};
//         var contextBlock={
//           isChorus:(isChorus?true:false),
//           context:[]
//         };
//         for (var id in verse) {
//           var verseLine = verse[id];
//           contextBlock.context.push(verseLine);
//           // objectLyric['context'][k][id]=verseLine;
//           $('p').html(verseLine.replace(/\[(.*?)\]/g,'<span data-chord="$1"></span>')).appendTo(verseContainer);
//         }
//         objectLyric['lyric'].push(contextBlock);
//       }
//     } finally {
//
//     }
//   });
//   return container;
// };