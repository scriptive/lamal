import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelService } from "../panel.service";
import { DataService,itfCategory,itfLyric } from '../data.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  // private posts: Observable<itfCategory[]>;
  // private posts:any;
  private posts:Observable<any[]>;
  constructor(
    private panel: PanelService,
    private dataService: DataService
  ) {
    this.posts = this.dataService.visibleCategory();
  }
  ngOnInit() {
    this.panel.closeIf();
  }
}