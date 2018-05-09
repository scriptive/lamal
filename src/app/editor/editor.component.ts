import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PanelService } from "../panel.service";
import { DataService,itfCategory,itfLyric } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  private postMessage: string;
  private postId: string;
  private kindCategory:Observable<any[]>;
  private typeCategory:Observable<any[]>;
  private langCategory:Observable<any[]>;

  private postDoc = {

    metaTitle:'',
    metaLyric:'',

    metaArtist:'',
    metaWriter:'',
    metaAlbum:'',
    metaYear:'',

    srcKind:{alb:'1'}, //zbc,glh,oth
    srcLang:'11', //8-11
    srcType:'3',//1-3

    userId:'',
    userName:'',
    // userId:this.authService.userCurrent.uid,
    // userName:this.authService.userCurrent.displayName,
    userDate:new Date(),
    userEdition:0,
    userVote:0
  };

  constructor(
    private route: ActivatedRoute,
    private panel: PanelService,
    private authService: AuthService,
    private dataService: DataService
  ) {
    this.kindCategory = this.dataService.kindCategory();
    this.typeCategory = this.dataService.typeCategory();
    this.langCategory = this.dataService.langCategory();
    this.postMessage = 'Note: myanmar hymns no.410';
    if (this.route.snapshot.queryParams.id) {
      this.dataService.activeLyric(this.route.snapshot.queryParams.id).subscribe(raw=>{
        let user = this.authService.userCurrent;
        // user.uid == row.userId || user.email
        this.postDoc.userId=user.uid;
        this.postDoc.userName=user.displayName;
        this.postId=raw.payload.id;
        // const row = raw.payload.data();
        Object.assign(this.postDoc, raw.payload.data());
      });
    }

  }

  ngOnInit() {
  }
  post() {
    // console.log('submit')
    // console.log('working checkout-> this.postDoc');

    this.postDoc.metaTitle = this.postDoc.metaLyric.split('\n')[0];

    if (this.postDoc.metaTitle == this.postDoc.metaLyric) {
      return this.postMessage = 'Please provide your lyric!';
    }
    // this.postMessage = '<span class="animate-spin icon-loading"><span>';
    // messageContainer.html(
    //   $('span').addClass('animate-spin icon-loading')
    // );

    this.postDoc.userEdition++;
    // this.postDoc.userVote++;
    Object.keys(this.postDoc.srcKind).forEach((k) => (this.postDoc.srcKind[k] == '' || this.postDoc.srcKind[k] == null) && delete this.postDoc.srcKind[k]);
    if (this.postId){
      this.dataService.collectionLyric().doc(this.postId).set(this.postDoc).then(()=> {
        this.postMessage = 'Updated';
      }).catch(error =>{
        this.postMessage = error.message;
      });
    } else {
      this.dataService.collectionLyric().add(this.postDoc).then(doc => {
        this.postMessage = 'Posted with custom id '+ this.postDoc.srcKind['oth'] +' - '+ doc.id;
      }).catch(error => {
        this.postMessage = error.message;
      });
    }
  }
}
