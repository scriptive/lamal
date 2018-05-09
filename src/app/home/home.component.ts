import { Component, OnInit } from '@angular/core';
// import { Router } from "@angular/router";

import { PanelService } from "../panel.service";
import { AuthService } from "../auth.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private messageCollection:string[] = ["Good!", "Great!", "Awesome!", "Hi","Dammaw?"];
  private messageActive:string;
  constructor(private authService: AuthService,private panel: PanelService) {
    this.messageActive= this.messageCollection[Math.floor(Math.random() * this.messageCollection.length)];
  }
  ngOnInit() {
    this.panel.closeIf();
  }
}


// var messageCollection = ["Good!", "Great!", "Awesome!", "Hi there!","Hi dammaw?",configuration.name];
// if (user){
//   var messageActive= messageCollection[Math.floor(Math.random() * messageCollection.length)];
//   if (user.displayName) {
//     // $('span').addClass('logo').html('Hi dammaw?')
//     return $('p').appendChild(
//       $('span').addClass('logo').html(messageActive),
//       $('a').html('Khen Solomon Lethil').attr('href','#user?')
//     );
//   } else {
//     return $('p').appendChild(
//       $('span').addClass('logo').html(messageActive),
//       $('a').html('khensolomon@gmail.coms').attr('href','#user?'),
//       $('span').addClass('other').html('...update profile?')
//     );
//
//   }
// } else {
//   return $('p').appendChild(
//     $('span').addClass('logo').html('Are you'),
//     $('a').html('signing in...').attr('href','#signin?'),
//     $('span').addClass('other').html('or'),
//     $('a').html('...ready to signup?').attr('href','#signup?')
//   );
//
// }