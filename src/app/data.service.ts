import { Injectable } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
// import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
@Injectable()

// ng g c lyric --module app

export class DataService {
  idCategory: string;
  rawCategory: AngularFirestoreCollection<itfCategory>;
  // rawCategory: Observable<itfCategory[]>;
  // rawCategory:any;
  // rawCategory:Observable<any[]>;
  // rawCategory: itfCategory[];
  // rowCategory: itfCategory;
  rowCategory: any;
  // rowCategory: itfCategory[];
  idLyric: string;
  rawLyric: AngularFirestoreCollection<itfLyric>;
  // rawLyric: Observable<itfLyric[]>;
  // rowLyric itfLyric;


  // public lyricCollection: AngularFirestoreCollection<itfLyric>;
  // public lyricRaw: Observable<any[]>;
  // public lyrics: Observable<object[]>;
  public lyrics:object={};

  constructor(
    private authService: AuthService,
  private firestore: AngularFirestore) {

    this.subscribeCategory();

    // this.lyricCollection = this.firestore.collection<itfLyric>('lyric');
    // this.lyricData = this.lyricCollection.valueChanges();
    // this.lyricData = this.lyricCollection.snapshotChanges().map(raw => {});

    // this.dataKind = firestore.collection('kind').valueChanges();
    // this.dataLang = firestore.collection('lang').valueChanges();
    // this.dataLyric = firestore.collection('lyric').valueChanges();
  }

  db(){
    return this.firestore;
  }
  subscribeCategory(): void {
    this.rawCategory = this.db().collection<itfCategory>('category');
  }
  snapshotCategory(){
    return this.rawCategory.snapshotChanges().map(raw => {
      return raw.map(a => {
        const row = a.payload.doc.data();
        row.idDoc = a.payload.doc.id;
        return row;
      });
    });
  }
  visibleCategory(){
    return this.snapshotCategory().map(raw => {
      return raw.map(row => row).filter(e => (e.url));
    });
  }
  kindCategory(){
    return this.snapshotCategory().map(raw => {
      return raw.map(row => row).filter(e => (e.variety == 'Kind'));
    });
  }
  typeCategory(){
    return this.snapshotCategory().map(raw => {
      return raw.map(row => row).filter(e => (e.variety == 'Type'));
    });
  }
  langCategory(){
    return this.snapshotCategory().map(raw => {
      return raw.map(row => row).filter(e => (e.variety == 'Lang'));
    });
  }
  // currentCategory() {
  //   return this.snapshotCategory().subscribe(raw => {
  //     return raw.map(row => row).filter(e => (e.idDoc == this.idCategory));
  //   });
  // }
  callbackCategory(callback){
    this.snapshotCategory().subscribe(raw => {
      this.rowCategory = raw.map(row => row).filter(e => (e.idDoc == this.idCategory))[0];
      return callback(this.rowCategory);
    });
  }
  // subscribeSource(){
  //   return this.db().collection('source').snapshotChanges().map(raw => {
  //     return raw.map(a => {
  //       const row = a.payload.doc.data() as Source;
  //       row.idDoc = a.payload.doc.id;
  //       return row;
  //     });
  //   });
  // }
  collectionLyric() {
    // return this.db().collection<itfLyric>('lyric');
    return this.db().collection('lyric');
  }
  subscribeLyric(): void {
    let src = 'src';
    src = src+this.rowCategory.variety;
    if (this.rowCategory.group) {
      src = src+'.'+this.rowCategory.group;
    }
    if (this.rowCategory.group) {
      this.rawLyric = this.db().collection<itfLyric>('lyric', ref => ref.where(src, '>', '').orderBy(src,'desc'));
      // console.log(src,'>', '')
    } else {
      this.rawLyric = this.db().collection<itfLyric>('lyric', ref => ref.where(src, '==', this.idCategory));
      // .orderBy('srcKind.oth')
      // console.log(src,'==', this.idCategory)
    }
    // this.rawLyric = this.db().collection<itfLyric>('lyric', ref => ref.where('srcKind.alb', '==', '1'));
  }
  snapshotLyric(){
    return this.rawLyric.snapshotChanges().map(raw => {
      // console.log(this.authService.userCurrent);
      let user = this.authService.userCurrent;
      // console.log(user.uid,user.email );
      return raw.map(a => {
        const row = a.payload.doc.data();
        // console.log(row)
        let i = this.formatLyric(row.metaLyric);
        // console.log(row.userId,user.uid)
        if (user.uid == row.userId || user.email =='khensolomon@gmail.com') {
          row.editAble = true;
        }

        // NOTE: title, chord, lyric
        row.title = i.title;
        row.lyric = i.lyric;
        row.chord = i.chord;
        row.idDoc = a.payload.doc.id;
        return row;
      });
    });
  }
  visibleLyric(){
    return this.snapshotLyric().map(raw => {
      return raw.map(row => row);
    });
  }
  // currentLyric() {
  //   return this.snapshotLyric().subscribe(raw => {
  //     return raw.map(row => row).filter(e => (e.idDoc == this.idLyric));
  //   });
  // }
  activeLyric(id) {
    return this.collectionLyric().doc(id).snapshotChanges();
  }
  deleteLyric(id) {
    console.log(id);
    // return this.collectionLyric().doc(id).delete();
  }
  formatLyric(raw){
    var rawObject={
      title:'',chord:{}, lyric:[]
    };
    var rawBlock = raw.split(/\n\s/).filter(function(e){ return e === 0 || e });
    rawBlock.forEach(function (v,k) {
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
  }
  // insertLyric(post,id?){
  //   if (id){
  //     return this.collectionLyric().doc(id).set(post);
  //   }
  //   return this.collectionLyric().add(post);
  // }
  // insert(post,id?){
  //   // let idDoc,post;
  //   if (id){
  //     this.db().collection("lyric").doc(id).set(post).then(function() {
  //       console.log('Posted')
  //     }).catch(function(error) {
  //       console.log(error.message);
  //     });
  //   } else {
  //     this.db().collection("lyric").add(post).then(function(doc) {
  //       // idDoc=doc.id;
  //       console.log('Posted with custom id', doc.id)
  //     }).catch(function(error) {
  //       console.log(error.message);
  //     });
  //   }
  // }
  // update(){
  //   let idDoc,post;
  //   this.db().collection("lyric").doc(idDoc).update(post).then(function() {
  //     console.log("Document successfully updated!");
  //   }).catch(function(error) {
  //     console.log(error)
  //   });
  //
  //   // var example = this.db().collection("lyric").doc(idDoc);
  //   // example.set({name: "Frank",avorites: { food: "Pizza", color: "Blue", subject: "recess" },age: 12});
  //   // example.update({"age": 13,"favorites.color": "Red"}).then(function() {
  //   //   console.log("Document successfully updated!");
  //   // });
  // }
  // delete(){
  //   let idDoc;
  //   this.db().collection("lyric").doc(idDoc).delete().then(function() {
  //     console.log("Document successfully deleted!");
  //   }).catch(function(error) {
  //     console.log(error)
  //   });
  // }
}
// ('lyric', ref => ref.where('cat.type', '>=', 'Category.unique'));
// ('lyric', ref => ref.where('Category.unique', '>', '0'));
export interface itfLyric {

  metaAlbum: string;
  metaTitle: string;
  metaArtist: string;
  metaLyric: string;
  metaWriter: string;
  metaYear: string;

  srcLang:string;
  srcType:string;
  srcKind:{
    glh:string,
    zbc:string,
    alb:string,
    oth:string
  };

  userDate: string;
  userEdition: number;
  userId: string;
  userName: string;
  userVote: number;
  editAble:boolean;
  idDoc: string
}
// export interface Source {
//   desc: string;
//   name: string;
//   unique: string;
//   // idDoc:string
// }
export interface itfCategory {
  name: string;
  desc: string;
  variety:string;
  group:string;
  url: string;
  total:number;
  // idDoc:string
}