import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PanelService } from "../panel.service";
import { DataService,itfLyric } from '../data.service';
@Component({
  selector: 'app-lyric',
  templateUrl: './lyric.component.html',
  styleUrls: ['./lyric.component.scss']
})
export class LyricComponent implements OnInit {
  private posts:Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private panel: PanelService,
    private dataService: DataService
  ) {
    if (this.route.snapshot.params.category) {
      this.dataService.idCategory = this.route.snapshot.params.category;
    }
    this.dataService.callbackCategory(row=>{
      this.dataService.subscribeLyric();
      this.posts = this.dataService.visibleLyric();
    });
  }
  chord(post) {
    let chord = Object.keys(post.chord);
    if (chord.length) return chord.join(',');
  }
  hasChord(post){
    return (post.lyric[0].hasChord);
  }
  showChord(paragraph){
    // TODO: improve
    return paragraph.replace(/\[(.*?)\]/g,'<span class="abcd">$1</span>');
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
  delete(id) {
    this.dataService.deleteLyric(id);
    // this.dataService.deleteLyric(id).then(function() {
    // }).catch(function(error) {
    //   console.error("Error removing document: ", error);
    // });
  }
  ngOnInit() {
    this.panel.closeIf();
  }
}
