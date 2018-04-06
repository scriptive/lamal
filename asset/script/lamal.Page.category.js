var ul = $('ul').addClass('category');
var o = app.Data.source;
$(app.scContent).html(ul);
for (var id in o) {
  if (o.hasOwnProperty(id)) {
    var i=o[id], dataTotal = (i.total)?i.total:'0';
    $('li').appendChild(
      $('div').appendChild(
        $('a').html(i.name).attr('data-total',dataTotal).attr('href','#song?category='+id)
        // $('p').html(i.desc)
      ).toggleClass('active',id==local.name.query.category)
    ).appendTo(ul);
  }
}
resolve();

// var firestore = app.fire.firestore();
// $('one moment please!').notify(function(res,rej){
//   var ul = $('ul').addClass('category');
//   $(app.scContent).html(ul);
//   return firestore.collection("source").get().then(function(raw) {
//     raw.forEach(function(row){
//       var i=row.data(), dataTotal = (i.total)?i.total:'0';
//       $('li').appendChild(
//         $('div').appendChild(
//           $('a').html(i.name).attr('data-total',dataTotal).attr('href','#song?category='+row.id)
//           // $('p').html('this is description...')
//         ).toggleClass('active',row.id==local.name.query.category)
//       ).appendTo(ul);
//     });
//   }).catch(function(error) {
//   }).then(function() {
//     resolve();
//   });
// });
// var raw=[
//   {
//     id:'1',
//     name:'lapi',
//     desc:'Hymn',
//     nameUnique:'lapi',
//     type:'boolean'
//   },
//   {
//     id:'2',
//     name:'latom',
//     desc:'Praise & Worship',
//     nameUnique:'latom',
//     type:'boolean'
//   },
//   {
//     id:'3',
//     name:'ZBC',
//     desc:'ZBC Hymn',
//     nameUnique:'zbc',
//     nametype:'number'
//   },
//   {
//     id:'4',
//     name:'Galhiam',
//     desc:'Galhiam Phatna late',
//     nameUnique:'galhiam',
//     nametype:'number'
//   },
//   {
//     id:'5',
//     name:'Other',
//     desc:'',
//     nameUnique:'other',
//     nametype:'number,boolean,any'
//   }
// ];
//
// raw.forEach(function(row){
//   $('li').appendChild(
//     $('div').appendChild(
//       $('a').html(row.name).attr('data-total','12350').attr('href','#song?category='+row.id),
//       $('p').html('this is description...')
//     ).toggleClass('active',row.id==local.name.query.category)
//   ).appendTo(ul);
// });
// resolve();
// firestore.collection("category").get().then(function(raw) {
//     raw.forEach(function(doc){
//       console.log(raw.id,raw.data());
//     });
// });
// firestore.collection("category").doc('1').get().then(function(row) {
//     console.log(row.id,row.data());
// });