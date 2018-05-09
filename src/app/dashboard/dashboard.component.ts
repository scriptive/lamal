import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { PanelService } from "../panel.service";
import { AuthService } from '../auth.service';
import { NotifyService } from '../notify.service';

// import * as firebase from 'firebase/app';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // private userEmailVerified:boolean;
  // private userDisplayName:string;
  // private userPhotoURL:string;
  private userEmail:string;
  private userPassword:string;
  private userName:string;
  private updateEmailForm:boolean=false;
  private updatePasswordForm:boolean=false;
  private updateNameForm:boolean=false;
  private testMessage:string = 'asdfasdf  kkk';
  constructor(
    private authService: AuthService,
    private notifyService: NotifyService,
    private panel: PanelService
  ) {
    this.authService.user.subscribe((user) => {
      if (this.authService.hasSignedIn() == false) this.authService.redirectToSignIn();
      // this.authService.user.emailVerified
      // console.log(this.authService.user.)
      // console.log(user.emailVerified);
      // this.userEmailVerified=user.emailVerified;
      // this.userEmail=user.email;
    });
    this.panel.closeIf();
  }
  sendEmailVerification(){
    // console.log(this.authService.userCurrent.emailVerified);
    if (this.authService.userCurrent.emailVerified) {
      this.notifyService.message('...already Verified!');
      this.notifyService.confirm('Ok',function(){
        console.log('Ok');
      });
    } else {
      this.authService.sendEmailVerification().then(() => {
        this.notifyService.message('...verification has been sent!');
        this.notifyService.confirm('Ok',function(){
          console.log('Ok');
        });
      }).catch((error) => {
        this.notifyService.message(error.message);
        this.notifyService.confirm('Ok',function(){
          console.log('Ok',error);
        });
      });
    }
  }
  updateEmail(){
    this.updateEmailForm=true;
  }
  updateEmailSubmit(){
    // this.updateEmailForm=false;
    // console.log(this.userEmail)
    if (this.userEmail) {
      this.authService.userCurrent.updateEmail(this.userEmail).then(() => {
        this.notifyService.message('E-mail has been updated!');
        this.notifyService.confirm('Ok',()=>{
          this.updateEmailForm=false;
        });
      }).catch((error) => {
        this.notifyService.message(error.message);
        this.notifyService.confirm('Try again');
        this.notifyService.cancel('Cancel',()=>{
          this.updateEmailForm=false;
        });
      });
    } else {
      this.updateEmailForm=false;
    }
  }
  updatePassword(){
    this.updatePasswordForm=true;
  }
  updatePasswordSubmit(){
    // this.updatePasswordForm=false;
    // updatePassword
    // console.log(this.userPassword);
    if (this.userPassword) {
      this.authService.userCurrent.updatePassword(this.userPassword).then(() => {
        this.notifyService.message('Password has been Updated');
        this.notifyService.confirm('Ok',()=>{
          this.updatePasswordForm=false;
        });
      }).catch((error) => {
        this.notifyService.message(error.message);
        this.notifyService.confirm('Try again');
        this.notifyService.cancel('Cancel',()=>{
          this.updatePasswordForm=false;
        });
      });
    } else {
      this.updatePasswordForm=false;
    }
  }
  updateName(){
    this.updateNameForm=true;
    // console.log(this.userName);
    // user.updateProfile({displayName:newdisplayName}).then(function() {
  }
  updateNameSubmit(){
    if (this.userName) {
      let objectProfile={};
      // objectProfile.displayName=this.userName;
      // this.authService.userCurrent.updateProfile
      this.authService.userCurrent.updateProfile({displayName:this.userName,photoURL:null}).then(() => {
        this.notifyService.message('Name has been updated!');
        this.notifyService.confirm('Ok',()=>{
          this.updateNameForm=false;
        });
      }).catch((error) => {
        this.notifyService.message(error.message);
        this.notifyService.confirm('Try again');
        this.notifyService.cancel('Cancel',()=>{
          this.updateNameForm=false;
        });
      });
    } else {
      this.updateNameForm=false;
    }
  }
  notifyPopup(msg:string){
    this.notifyService.message(msg);
    this.notifyService.confirm('Ok',function(){
      console.log('Ok');
    });
  }
  notifyConfirm(msg:string){
    this.notifyService.message(msg);
    this.notifyService.confirm('Agree',function(){
      console.log('Agree');
    });
    this.notifyService.cancel('Not agree',function(){
      console.log('Not agree');
    });
  }
}

