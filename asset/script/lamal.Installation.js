var firestore = app.fire.firestore();

var kindCollection=firestore.collection("kind");
kindCollection.doc('1').set({
  name:'Other'
}).then(function(doc) {
  kindCollection.doc('2').set({
    name:'Hymn'
  }).then(function(doc) {
    kindCollection.doc('3').set({
      name:'Praise & Worship'
    }).then(function(doc) {
      console.log('completed creating kind');
    }).catch(function(error) {
      console.log('kind 3',error);
    });
  }).catch(function(error) {
    console.log('kind 2',error);
  });
}).catch(function(error) {
  console.log('kind 1',error);
});

var sourceCollection=firestore.collection("source");
sourceCollection.doc('1').set({
  name:'Other', desc:'', unique:'oth'
}).then(function() {
  sourceCollection.doc('2').set({
    name:'ZBC', desc:'', unique:'zbc'
  }).then(function() {
    sourceCollection.doc('3').set({
      name:'Galhiam', desc:'', unique:'glh'
    }).then(function() {
      console.log('completed creating source');
    }).catch(function(error) {
      console.log('source 3',error);
    });
  }).catch(function(error) {
    console.log('source 2',error);
  });
}).catch(function(error) {
  console.log('source 1',error);
});

// var langCollection=firestore.collection("lang");
// langCollection.doc('1').set({
//   name:'Other'
// }).then(function(doc) {
//   langCollection.doc('2').set({
//     name:'English'
//   }).then(function(doc) {
//     langCollection.doc('3').set({
//       name:'Myanmar'
//     }).then(function(doc) {
//       langCollection.doc('4').set({
//         name:'Zolai'
//       }).then(function(doc) {
//         console.log('completed creating lang');
//       }).catch(function(error) {
//         console.log('lang 4',error);
//       });
//     }).catch(function(error) {
//       console.log('lang 3',error);
//     });
//   }).catch(function(error) {
//     console.log('lang 2',error);
//   });
// }).catch(function(error) {
//   console.log('lang 1',error);
// });


Na theihloh man hizaw

{"E":""}

Hon[E]git Topa Zeisu nun[A]tak tawntungna [E]hi,
Heh[E]pihna leh itna tawh ki[B]dim hi,
Lung[E]dam in lakasa lung[A]muangin ka om la,
Kei[B] khamuan na ka Topa [E]Jesu hi.

{Hong[A]itna Thei lecin, hong [E]ngaihna thei lecin,
Nang zong sangnuamlo in om[B]kei niteh,
Natheih[E]loh man hizaw, Na [A]tel lohman hizaw,
En dih[B]ve na kha ading hilo[E]maw.}

Sanggam aw hih leitung ading bang nageel hiam!
Na khantawn adingzong na geel ngei hiam!
Ka sathei kha kei in na khangdawng hoih lai in,
Tuate paakbang vulding naphawk thei hiam.

A kimuh theih lai-in, a hong nai om lai in,
Hong tung ding nazon hang namuh loh hun,
Hong tunma tumah in, A mah nial nawn kei-in,
En dih ve nakha ading in kong kun.

Ngaklah veng

{"D":""}

En ven ka ten na gamnuam, Leimi te'n atel zawhloh,
Mizawng mipoi te leh tagah te nopsak na gam,
Kei hong simmawh khake'n maw, inn leh lo kaneih loh hang,
Lei inn sang aphazaw vanah inn nuam kanei hi.

{Ngaklah veng tua khuapi katun hun ding,
To Zeisu a khutpawn kalet ni ciang
Lungdamna khitui te aluang ding a,
Kei hong honpa aw ci'n, Lungdam na la kasa ding.}

En ven tuuno anglai ah, melsia mipoi tampi te,
Vanmi bang mel etlawm Topa'n bawlpha khinzo ta,
Lei ah ih kosiat nate kham lukhu in khuta uh
A lutung tee ziah ziah, suangmanpha tawh kizem hi.

Sihna hanmual hongliamsan, Apaisa it leh ngai te'n,
Hih lei gentheihna gam nusia in hongpia un ci,
Kei ngai in kap kei un la, kei omna ah hongpai un,
Ih tun ding hong ngaklah van khuapi pan khut hongvan.

