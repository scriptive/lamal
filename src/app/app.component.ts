import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { GuardService } from './guard.service';
import { NotifyService } from './notify.service';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  pages:any[];
  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private dataService: DataService,
    private router: Router
  ) {
    this.authService.user.subscribe((user) => {
      this.pages=[];
      this.router.config.forEach((v,i)=>{
        if (v.hasOwnProperty('data')) {
          if (v.data.hasOwnProperty('auth')) {
            if (v.data.auth == 'user'){
              if (this.authService.hasSignedIn())this.pages.push(v);
            } else if (this.authService.hasSignedIn() == false){
              this.pages.push(v);
            }
          } else {
            this.pages.push(v);
          }
        }
      });
    });
  }
  ngOnInit(): void {
  }
}