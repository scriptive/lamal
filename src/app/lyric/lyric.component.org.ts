import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PanelService } from "../panel.service";
import { DataService,itfLyric } from '../data.service';
@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class LyricComponent implements OnInit {
  private posts:Observable<any[]>;
  private testPosts;

  constructor(
    private route: ActivatedRoute,
    private panel: PanelService,
    private dataService: DataService
  ) {
    // console.log(this.route.snapshot.params.category)
    if (this.route.snapshot.params.category) {
      this.dataService.idCategory = this.route.snapshot.params.category;
    }
    // if (this.route.snapshot.queryParams.category) {
    //   this.dataService.idCategory = this.route.snapshot.queryParams.category;
    // }
    // this.dataService.getCategoryCallback(row=>{
    //   this.posts = this.dataService.getLyric();
    // });
    // this.rawLyric = this.db().collection<itfLyric>('lyric');subscribe

    this.dataService.callbackCategory(row=>{
      this.dataService.subscribeLyric();
      this.posts =this.dataService.visibleLyric();
    });

    // this.testPosts = this.dataService.db().collection<itfLyric>('lyric').doc('1inIyLqkA0FyoJ0ZT9DC').valueChanges();
    // this.dataService.db().collection<itfLyric>('lyric').doc('1inIyLqkA0FyoJ0ZT9DC').snapshotChanges().subscribe(raw=>{
    //   // console.log(raw);
    //   // this.testPosts=[];
    //   // const row = raw.payload.data();
    //   // this.testPosts.push(row);
    // });
    // this.dataService.db().collection<itfLyric>('lyric').doc('1inIyLqkA0FyoJ0ZT9DC').snapshotChanges().subscribe(raw=>{
    //   this.testPosts=[];
    //   const row = raw.payload.data();
    //   this.testPosts.push(row);
    // });

    // this.dataService.db().collection<itfLyric>('lyric').doc('1inIyLqkA0FyoJ0ZT9DC').ref.get().then(raw => {
    //   this.testPosts=[];
    //   this.testPosts.push(raw.data());
    //   // this.testPosts=raw.data();
    //   // this.testPosts=raw.data();
    //   // console.log(raw.get('metaTitle'))
    //   console.log(raw)
    //   console.log(this.testPosts);
    //   this.dataService.db().collection<itfLyric>('lyric').doc(raw.id).snapshotChanges().subscribe(raw=>{
    //     this.testPosts=[];
    //     const row = raw.payload.data();
    //     this.testPosts.push(row);
    //   });
    // }).catch(function(error) {
    // });

  }
  chord(post) {
    let chord = Object.keys(post.chord);
    if (chord.length) return chord.join(',');
  }
  hasChord(post){
    return (post.lyric[0].hasChord);
  }
  showChord(paragraph){
    return paragraph.replace(/\[(.*?)\]/g,'<span class="abcd">$1</span>');
    // return paragraph.replace(/\[(.*?)\]/g,'<span data-chord="$1">$1</span>');
    // return paragraph.replace(new RegExp(/\[(.*?)\]/, "gi"), match => {
    //     return '<span class="highlightText">' + match + '</span>';
    // });
  }
  snap(post) {
    return post.lyric[0].context.join(' ').replace(/\[(.*?)\]/g,'')
  }
  view(post) {
    if (post.viewToggle) {
      post.viewToggle=false;
    } else {
      post.viewToggle=true;
    }
  }
  ngOnInit() {
    this.panel.closeIf();
  }
  // changeLyric() {
  //   this.dataService.snapshotLyric().subscribe(raw => {
  //     raw.forEach(row=>{
  //       let newRow = {
  //         metaTitle: row.metaTitle,
  //         metaArtist: row.metaArtist,
  //         metaLyric: row.metaLyric,
  //         metaAlbum: row.metaAlbum,
  //         metaWriter: row.metaWriter,
  //         metaYear: row.metaYear,
  //         userDate: row.userDate,
  //         userEdition: row.userEdition,
  //         userId: row.userId,
  //         userName: row.userName,
  //         userVote: row.userVote,
  //
  //         srcLang:row.srcLang,
  //         srcType:'',
  //         srcKind:{
  //           // glh:row.srcGLH,
  //           // zbc:row.srcZBC,
  //           // alb:row.srcOTH,
  //           // oth:row.srcOTH
  //         }
  //       };
  //       if (row.srcGLH){
  //         newRow.srcKind['glh']=row.srcGLH;
  //       }
  //       if (row.srcZBC){
  //         newRow.srcKind['zbc']=row.srcZBC;
  //       }
  //       if (row.srcOTH){
  //         newRow.srcKind['alb']=row.srcOTH;
  //       }
  //       newRow.srcKind['alb']='6';
  //       // console.log(row.idDoc);
  //       this.dataService.db().collection("lyric").doc(row.idDoc).set(newRow).then(function() {
  //         console.log('Posted',row.idDoc);
  //       }).catch(function(error) {
  //         console.log(error,row.idDoc);
  //       });
  //     })
  //   });
  // }
}
